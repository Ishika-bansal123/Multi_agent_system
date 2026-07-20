# 🔍 Multi-Agent Research System

An AI-powered research assistant that uses a team of specialized AI agents to automatically search the web, extract relevant information, generate a structured research report, and critique the final output.

Built with **FastAPI**, **LangChain**, **Mistral AI**, **Tavily Search**, and a modern **Vite + JavaScript** frontend.

---

## 🚀 Features

- 🔎 AI-powered web search using Tavily
- 📄 Automatic content extraction from web pages
- 📝 Structured research report generation
- 🧐 AI-based report critique and evaluation
- 📋 Copy report to clipboard
- 📥 Download report as a text file
- 🎯 Interactive and responsive user interface
- ⚡ FastAPI backend with REST API
- 🤖 Multi-Agent architecture using LangChain

---

## 🏗️ Architecture

```
                User
                  │
                  ▼
         Frontend (Vite + JS)
                  │
          HTTP REST API
                  │
                  ▼
         FastAPI Backend
                  │
      ┌───────────┼───────────┐
      │           │           │
      ▼           ▼           ▼
 Search Agent  Reader Agent  Writer Agent
      │           │
      └──────► Critic Agent ◄──────┘
                  │
                  ▼
         Final Research Report
```

---

## 🤖 AI Agent Workflow

### 🔎 Search Agent

- Searches the web for reliable and recent information
- Uses Tavily Search API
- Collects titles, URLs, and summaries

---

### 📄 Reader Agent

- Reads the most relevant web pages
- Extracts useful content
- Removes unnecessary HTML elements

---

### 📝 Writer Agent

- Combines all gathered information
- Produces a well-structured research report
- Generates:
  - Introduction
  - Key Findings
  - Conclusion
  - Sources

---

### 🧐 Critic Agent

Reviews the generated report and provides:

- Overall score
- Strengths
- Suggestions
- Final verdict

---

# 🛠️ Tech Stack

## Frontend

- HTML5
- CSS3
- JavaScript (ES6)
- Vite

---

## Backend

- FastAPI
- Python
- LangChain
- Mistral AI
- Tavily Search API
- BeautifulSoup
- Requests

---

## AI & LLM

- Mistral Small
- LangChain Agents
- Prompt Engineering

---

# 📂 Project Structure

```
MULTI_AGENT_SYSTEM
│
├── backend
│   ├── app.py
│   ├── agents.py
│   ├── pipeline.py
│   ├── tools.py
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
cd MULTI_AGENT_SYSTEM
```

---

## Backend Setup

```bash
cd backend

python -m venv .venv

# Windows
.venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file inside the backend directory:

```env
MISTRAL_API_KEY=YOUR_API_KEY
TAVILY_API_KEY=YOUR_API_KEY
```

Run the backend:

```bash
uvicorn app:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---



# API Endpoint

### POST /research

Request

```json
{
    "topic": "Artificial Intelligence in Healthcare"
}
```

Response

```json
{
    "success": true,
    "topic": "...",
    "search_results": "...",
    "scraped_content": "...",
    "report": "...",
    "feedback": "..."
}
```

---

# Future Improvements

- PDF export
- Citation management
- Research history
- User authentication
- Multi-language support
- Streaming responses
- Dark mode
- Source confidence scoring

---

# Author

**Ishika Bansal**

B.Tech Computer Science & Engineering

National Institute of Technology Jalandhar

---

## ⭐ If you found this project useful, consider giving it a star.