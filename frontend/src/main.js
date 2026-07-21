import "./styles.css";
import { marked } from "marked";
const API_URL =
  import.meta.env.VITE_RESEARCH_API_URL 

console.log("API URL:", API_URL);
const sampleResult = {
  search_results:
    "Title : The State of Generative AI in Enterprise Research\nURL: https://example.com/genai-enterprise-research\nSnippet: Organizations are using AI agents to gather evidence, compare sources, synthesize insights, and accelerate decision-making.\n\n-----\nTitle : Multi-Agent Systems for Knowledge Work\nURL: https://example.com/multi-agent-systems\nSnippet: Specialized agents can divide tasks such as discovery, extraction, drafting, and review to improve output quality.",
  scraped_content:
    "The most useful deployments combine retrieval, web search, content extraction, structured writing, and independent critique. Strong systems preserve source context, expose confidence signals, and make the final output easy to review.",
  report:
    "## Introduction\nMulti-agent AI research systems coordinate specialized models and tools to produce faster, more structured research outputs.\n\n## Key Findings\n1. Search agents improve coverage by collecting relevant sources and snippets.\n2. Reader agents deepen evidence quality by extracting longer passages from selected sources.\n3. Writer agents turn evidence into a polished narrative with a clear structure.\n4. Critic agents improve trust by checking clarity, completeness, and evidence quality.\n\n## Conclusion\nA four-agent research pipeline can deliver client-ready reports when each step is transparent, auditable, and easy to export.\n\n## Sources\n- https://example.com/genai-enterprise-research\n- https://example.com/multi-agent-systems",
  feedback:
    "score: 8/10\n\nStrengths:\n- Clear structure with practical findings.\n- Good explanation of each agent role.\n\nOne line verdict:\nStrong executive-ready draft; add more live citations for final delivery."
};

const agents = [
["Search Agent","Discovers trusted sources","Discovery","cyan"],
["Reader Agent","Extracts key evidence","Evidence","green"],
["Writer Agent","Generates detailed report","Report","amber"],
["Critic Agent","Reviews report quality","Review","blue"]
];

const examples = [
  "AI in healthcare diagnostics",
  "Future of autonomous financial research",
  "Climate tech investment trends in 2026",
  "Agentic AI for enterprise operations"
];

const tabs = [
["report","Report"],
["feedback","Review"],
["search_results","Sources"],
["scraped_content","Evidence"]
];

const state = {
  topic: "",
  result: null,
  activeTab: "report",
  isLoading: false,
  error: "",
  demoMode: false,
  copyStatus: ""
};

const root = document.querySelector("#root");

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function reportText() {
  if (!state.result) return "";

  return [
    `TOPIC:\n${state.topic || "Demo research topic"}`,
    "================================================",
    `SEARCH RESULTS\n\n${state.result.search_results || ""}`,
    "================================================",
    `SCRAPED CONTENT\n\n${state.result.scraped_content || ""}`,
    "================================================",
    `RESEARCH REPORT\n\n${state.result.report || ""}`,
    "================================================",
    `CRITIC FEEDBACK\n\n${state.result.feedback || ""}`
  ].join("\n\n");
}

function updateState(nextState) {
  Object.assign(state, nextState);
  render();
}

function render() {
  root.innerHTML = `
    <main class="app-shell">
      <section class="hero-section">
        <div class="hero-overlay"></div>
        <img class="hero-image" src="/images/multi-agent-research-hero.png" alt="Four AI research agents connected to a polished research report" />
        <nav class="topbar" aria-label="Primary">
          <a class="brand-lockup" href="#research-console" aria-label="Multi-Agent Research System home">
            <span class="brand-mark">AI</span>
            <span>Multi-Agent Research System</span>
          </a>
          
        </nav>

        <div class="hero-content">
          <div class="hero-copy">
            <span class="eyebrow">Four specialized AI agents</span>
<h1>Multi-Agent AI Research Platform</h1>         
   <p>
  Four intelligent AI agents collaborate to search trusted sources,
  extract evidence, generate professional research reports, and
  evaluate quality—all from a single interface.
</p>
            <div class="hero-actions">
              <a href="#research-console" class="primary-link">Start Research</a>
              <button class="ghost-button" type="button" data-action="toggle-demo">
                ${state.demoMode ? "Demo mode on" : "▶ Try Demo"}
              </button>
            </div>
          </div>

          <div class="agent-grid" aria-label="Agent workflow">
            ${agents
              .map(
                ([name, role, label, accent], index) => `
                  <article class="agent-card ${accent}">
                    <div class="agent-step">0${index + 1}</div>
                    <span class="agent-label">${label}</span>
                    <h2>${name}</h2>
                    <p>${role}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="console-section" id="research-console">
        <div class="section-heading">
          <span class="eyebrow dark">Research workspace</span>
          <h2>Run the complete pipeline from one clear interface.</h2>
        </div>

        <div class="console-layout">
          <aside class="control-panel">
            <form id="research-form">
              <label for="topic">Research topic</label>
              <textarea
                id="topic"
                placeholder="Example: Artificial Intelligence in Healthcare"
                rows="5"
              >${escapeHtml(state.topic)}</textarea>

              <div class="quick-topics" aria-label="Example topics">
                ${examples
                  .map(
                    (example) => `
                      <button type="button" data-topic="${escapeHtml(example)}">${escapeHtml(example)}</button>
                    `
                  )
                  .join("")}
              </div>

              <label class="toggle-row">
                <input id="demo-mode" type="checkbox" ${state.demoMode ? "checked" : ""} />
                <span>Preview with sample output</span>
              </label>

              <button class="run-button" type="submit" ${state.isLoading ? "disabled" : ""}>
                <span class="${state.isLoading ? "spinner" : "run-mark"}"></span>
                ${state.isLoading ? "Agents are working..." : "Start research"}
              </button>
            </form>

            <div class="pipeline-timeline" aria-label="Pipeline status">
              ${agents
                .map(([name], index) => {
                  const complete = Boolean(state.result);
                  const active = state.isLoading;
const status = active
? "Running..."
: complete
? "Completed"
: "Waiting";                  return `
                    <div class="timeline-item ${complete ? "complete" : ""} ${active ? "active" : ""}">
                      <span>${complete ? "OK" : `0${index + 1}`}</span>
                      <div>
                        <strong>${name}</strong>
                        <small>${status}</small>
                      </div>
                    </div>
                  `;
                })
                .join("")}
            </div>
          </aside>

          <section class="results-panel" aria-live="polite">
            ${renderResultsPanel()}
          </section>
        </div>
      </section>
      <footer class="footer">
    <p>Multi-Agent Research Platform • Powered by Artificial Intelligence</p>
</footer>
    </main>
  `;

  bindEvents();
}

function renderResultsPanel() {
  if (state.error) {
    return `
      <div class="error-box">
        <strong>Connection issue</strong>
        <p>${escapeHtml(state.error)}</p>
      </div>
    `;
  }

  if (state.isLoading) {
    return `
      <div class="loading-state">
        <span class="large-spinner"></span>
<h3>

Running Multi-Agent Workflow

</h3>       
<p>

 Searching trusted sources...

Extracting evidence...

Writing report...

Reviewing quality...

</p>      
</div>
    `;
  }

  if (!state.result) {
    return `
      <div class="empty-state">
        <span class="empty-mark">QA</span>
        <h3>Start Your Research</h3>
Start Your Research      </div>
    `;
  }

  const activeContent = state.result[state.activeTab] || "No content returned for this section.";

  return `
    <div class="results-toolbar">
      <div class="tabs" role="tablist" aria-label="Research result sections">
        ${tabs
          .map(
            ([id, label]) => `
              <button
                type="button"
                role="tab"
                aria-selected="${state.activeTab === id}"
                class="${state.activeTab === id ? "active" : ""}"
                data-tab="${id}"
              >${label}</button>
            `
          )
          .join("")}
      </div>
      <div class="export-actions">
        <button type="button" data-action="copy" aria-label="Copy full report">Copy</button>
        <button type="button" data-action="download" aria-label="Download full report">Save</button>
        <button type="button" data-action="reset" aria-label="Reset results">Reset</button>
      </div>
    </div>
    ${state.copyStatus ? `<p class="copy-status">${escapeHtml(state.copyStatus)}</p>` : ""}
    <article class="result-document markdown-body">
  ${marked.parse(String(activeContent || ""))}
</article>
  `;
}

function bindEvents() {
  document.querySelector("#research-form")?.addEventListener("submit", runResearch);
  document.querySelector("#topic")?.addEventListener("input", (event) => {
    state.topic = event.target.value;
  });
  document.querySelector("#demo-mode")?.addEventListener("change", (event) => {
    updateState({ demoMode: event.target.checked });
  });

  document.querySelectorAll("[data-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      updateState({ topic: button.dataset.topic || "" });
    });
  });

  document.querySelectorAll("[data-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      updateState({ activeTab: button.dataset.tab });
    });
  });

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      if (action === "toggle-demo") updateState({ demoMode: !state.demoMode });
      if (action === "copy") copyReport();
      if (action === "download") downloadReport();
      if (action === "reset") updateState({ result: null, error: "", copyStatus: "" });
    });
  });
}

async function runResearch(event) {
  event.preventDefault();

  const cleanTopic = state.topic.trim();

  if (!cleanTopic && !state.demoMode) {
    updateState({
      error: "Enter a topic before starting the research pipeline."
    });
    return;
  }

  updateState({
    error: "",
    isLoading: true,
    result: null,
    activeTab: "report",
    copyStatus: ""
  });

  try {
    // Demo mode
    if (state.demoMode) {
      await new Promise((resolve) => setTimeout(resolve, 850));
      updateState({
        result: sampleResult,
        isLoading: false
      });
      return;
    }

    // Call FastAPI backend
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        topic: cleanTopic
      })
    });

    const payload = await response.json().catch(() => ({}));

    // HTTP Error
    if (!response.ok) {
      throw new Error(payload.message || "Research request failed.");
    }

    // Backend returned success = false
    if (!payload.success) {
      throw new Error(payload.message || "Research failed.");
    }

    // Store only the required fields
    updateState({
      result: {
        search_results: payload.search_results,
        scraped_content: payload.scraped_content,
        report: payload.report,
        feedback: payload.feedback
      },
      isLoading: false
    });

  } catch (requestError) {
    updateState({
      error: requestError.message,
      isLoading: false
    });
  }
}

function downloadReport() {
  const text = reportText();
  if (!text) return;

  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${(state.topic || "research_report").replace(/\s+/g, "_")}_report.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

async function copyReport() {
  const text = reportText();
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    updateState({ copyStatus: "Full report copied to clipboard." });
  } catch {
    updateState({ copyStatus: "Copy failed. Use Save to export the report instead." });
  }
}

render();
