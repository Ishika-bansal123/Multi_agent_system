import cors from "cors";
import express from "express";
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");
const backendDir = path.join(projectRoot, "backend");
const app = express();
const port = Number(process.env.PORT || 8000);
const pythonCommand = process.env.PYTHON || "python";

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "multi-agent-research-bridge" });
});

app.post("/api/research", (req, res) => {
  const topic = String(req.body?.topic || "").trim();

  if (!topic) {
    res.status(400).json({ error: "Topic is required." });
    return;
  }

  const code = `
import json
import sys
from pipeline import run_research_pipeline

topic = sys.argv[1]
try:
    result = run_research_pipeline(topic)
    print("__RESULT_START__" + json.dumps(result, ensure_ascii=False))
except Exception as exc:
    print("__ERROR_START__" + str(exc))
    sys.exit(1)
`;

  const child = spawn(pythonCommand, ["-c", code, topic], {
    cwd: backendDir,
    env: {
      ...process.env,
      PYTHONPATH: backendDir
    }
  });

  let stdout = "";
  let stderr = "";

  child.stdout.on("data", (chunk) => {
    stdout += chunk.toString();
  });

  child.stderr.on("data", (chunk) => {
    stderr += chunk.toString();
  });

  child.on("close", (exitCode) => {
    const resultMarker = "__RESULT_START__";
    const errorMarker = "__ERROR_START__";

    if (stdout.includes(resultMarker)) {
      const payload = stdout.slice(stdout.lastIndexOf(resultMarker) + resultMarker.length).trim();
      try {
        res.json(JSON.parse(payload));
      } catch (error) {
        res.status(502).json({ error: "The research pipeline returned invalid JSON.", details: error.message });
      }
      return;
    }

    const message = stdout.includes(errorMarker)
      ? stdout.slice(stdout.lastIndexOf(errorMarker) + errorMarker.length).trim()
      : stderr || `Pipeline exited with code ${exitCode}.`;

    res.status(500).json({ error: message });
  });
});

app.listen(port, () => {
  console.log(`Research bridge listening on http://localhost:${port}`);
});
