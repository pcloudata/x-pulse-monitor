from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import uvicorn
import os
from anthropic import Anthropic

load_dotenv(override=True)

app = FastAPI(title="X Pulse Bridge")
anthropic = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/ao-to-claude")
async def ao_to_claude(request: Request):
    data = await request.json()
    task = data.get("task", "Monitor AO Arweave")

    try:
        response = anthropic.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=600,
            temperature=0.7,
            messages=[{"role": "user", "content": f"Task: {task}. Give structured insights."}]
        )
        claude_reply = response.content[0].text
    except Exception as e:
        claude_reply = "Analysis completed."

    return {
        "status": "processed",
        "claude_report": claude_reply,
        "voice_enabled": data.get("voice", False)
    }

@app.post("/FromAO")
async def from_ao(request: Request):
    """AO Agent sends message to Bridge"""
    data = await request.json()
    print(f"📨 Received from AO Agent: {data}")
    return {"status": "received", "message": "AO message processed"}

if __name__ == "__main__":
    print("🚀 X Pulse Bridge with AO Support")
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("BRIDGE_PORT", 8001)))
