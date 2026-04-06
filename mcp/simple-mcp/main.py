from fastapi import FastAPI
from dotenv import load_dotenv
import uvicorn
import os

load_dotenv()

app = FastAPI(title="X Pulse Simple MCP")

@app.get("/mcp")
async def mcp_health():
    return {
        "server": "X Pulse Simple MCP",
        "tools": ["searchPostsRecent", "getUserTimeline", "searchUsers"],
        "status": "ready"
    }

if __name__ == "__main__":
    print("�� Starting Simple MCP Server for X Pulse...")
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("MCP_PORT", 8000)))
