# Multi-Agent Research UI

Professional HTML, CSS, and JavaScript frontend for the existing Python research backend.

## Run the UI

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Connect to the existing backend without editing backend code

This frontend expects:

```http
POST /api/research
Content-Type: application/json

{ "topic": "Artificial Intelligence in Healthcare" }
```

Response:

```json
{
  "search_results": "...",
  "scraped_content": "...",
  "report": "...",
  "feedback": "..."
}
```

An optional bridge is included inside `frontend/server/api-bridge.js`. It imports the existing backend pipeline from `../backend/pipeline.py` and exposes the endpoint above.

```bash
npm run bridge
```

Then, in another terminal:

```bash
npm run dev
```

If you deploy with a separate API server, set `VITE_RESEARCH_API_URL` to the full endpoint URL, for example:

```bash
VITE_RESEARCH_API_URL=https://your-api-domain.com/api/research npm run build
```
