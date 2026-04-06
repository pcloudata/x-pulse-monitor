from fastapi import FastAPI, Request
from dotenv import load_dotenv
import uvicorn
import os
import json

load_dotenv()

app = FastAPI(title="X Pulse Bridge")

@app.get("/")
async def root():
    return {"status": "✅ Bridge is running", "mode": "multi-agent simulation"}

@app.post("/ao-to-claude")
async def ao_to_claude(request: Request):
    data = await request.json()
    task = data.get("task", "No task")
    voice = data.get("voice", False)

    print(f"📨 AO → Claude: {task} | Voice: {voice}")

    # Mock realistic response
    mock_posts = [
        {"user": "@AOBuilder", "text": "Just deployed my first autonomous agent on AO + X MCP 🔥", "likes": 42},
        {"user": "@ArweaveMaxi", "text": "Claude + AO multi-agent voice conversations are the future", "likes": 27}
    ]

    return {
        "status": "processed",
        "task": task,
        "mcp_status": "reachable",
        "claude_thought": f"Analyzing X for: {task}",
        "insights": f"Found {len(mock_posts)} relevant posts",
        "sample_posts": mock_posts,
        "ao_feedback": "Insights stored permanently on Arweave",
        "voice_enabled": voice,
        "next_action": "Will continue monitoring every 30 minutes"
    }

if __name__ == "__main__":
    print("🚀 X Pulse Bridge (Multi-Agent Mode)")
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("BRIDGE_PORT", 8001)))
