from fastapi import FastAPI, Request
from dotenv import load_dotenv
import uvicorn
import os
import httpx

load_dotenv()

app = FastAPI(title="X Pulse Bridge")
MCP_URL = f"http://127.0.0.1:{os.getenv('MCP_PORT', 8000)}/mcp"

@app.get("/")
async def root():
    return {
        "status": "✅ X Pulse Bridge is running",
        "mcp_endpoint": MCP_URL,
        "features": ["Simple MCP", "Claude Ready"]
    }

@app.post("/ao-to-claude")
async def ao_to_claude(request: Request):
    data = await request.json()
    task = data.get("task", "Run X pulse monitoring")
    
    print(f"📨 AO → Claude: {task}")
    
    mcp_status = "not_ready"
    try:
        async with httpx.AsyncClient(timeout=3.0) as client:
            resp = await client.get(MCP_URL, timeout=3.0)
            if resp.status_code == 200:
                mcp_status = "reachable"
    except:
        mcp_status = "not_ready"
    
    return {
        "status": "processed",
        "task": task,
        "mcp_status": mcp_status,
        "claude_response": f"I will use X MCP tools to {task.lower()}"
    }

if __name__ == "__main__":
    print("🚀 Starting X Pulse Bridge with XMCP support...")
    print(f"   MCP Endpoint → {MCP_URL}")
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("BRIDGE_PORT", 8001)))
