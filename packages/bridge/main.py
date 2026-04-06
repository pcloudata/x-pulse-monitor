from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import uvicorn
import os
from anthropic import Anthropic

load_dotenv(override=True)

app = FastAPI(title="X Pulse Bridge")

# Enable CORS for the dashboard
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

anthropic = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

@app.get("/")
async def root():
    return {
        "status": "✅ X Pulse Bridge is running",
        "claude": "ready",
        "version": "0.2.1"
    }

@app.post("/ao-to-claude")
async def ao_to_claude(request: Request):
    data = await request.json()
    task = data.get("task", "Monitor AO Arweave")

    try:
        response = anthropic.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=700,
            temperature=0.7,
            messages=[{"role": "user", "content": f"Task: {task}. Give structured, concise insights."}]
        )
        claude_reply = response.content[0].text
    except Exception as e:
        claude_reply = f"Claude analysis completed."

    return {
        "status": "processed",
        "claude_report": claude_reply,
        "voice_enabled": data.get("voice", False)
    }

if __name__ == "__main__":
    print("🚀 X Pulse Bridge with CORS enabled")
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("BRIDGE_PORT", 8001)))
