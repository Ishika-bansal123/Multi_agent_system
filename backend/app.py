from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pipeline import run_research_pipeline

# Create FastAPI app
app = FastAPI(
    title="Multi-Agent Research System",
    description="Backend API for Multi-Agent Research Assistant",
    version="1.0.0"
)

# Allow frontend (Vite) to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Body
class ResearchRequest(BaseModel):
    topic: str


# Root API
@app.get("/")
def home():
    return {
        "message": "Multi-Agent Research System Backend is Running 🚀"
    }


# Research Endpoint
@app.post("/research")
def research(request: ResearchRequest):

    topic = request.topic.strip()

    if not topic:
        return {
            "success": False,
            "message": "Topic cannot be empty."
        }

    try:
        result = run_research_pipeline(topic)

        return {
            "success": True,
            "topic": topic,
            "search_results": result.get("search_results", ""),
            "scraped_content": result.get("scraped_content", ""),
            "report": result.get("report", ""),
            "feedback": result.get("feedback", "")
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }