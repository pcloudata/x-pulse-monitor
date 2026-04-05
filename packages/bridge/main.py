from fastapi import FastAPI
from dotenv import load_dotenv
import uvicorn
import os

load_dotenv()

app = FastAPI(title="X Pulse Bridge")

@app.get("/")
async def root():
    return {
        "status": "X Pulse Bridge is running",
        "mcp": f"http://127.0.0.1:{os.getenv('MCP_PORT', 8000)}/mcp",
        "version": "0.1.0"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("BRIDGE_PORT", 8001)))
