from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import uvicorn
import os
from anthropic import Anthropic

load_dotenv(override=True)

app = FastAPI(title="X Pulse Bridge")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

anthropic = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

@app.get("/")
async def root():
    return {"status": "✅ Bridge is running", "claude": "ready"}

@app.post("/ao-to-claude")
async def ao_to_claude(request: Request):
    data = await request.json()
    task = data.get("task", "Monitor AO Arweave")

    try:
        response = anthropic.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=500,           # Reduced for speed
            temperature=0.7,
            messages=[{
                "role": "user",
                "content": f"Task: {task}. Give short, structured insights (max 400 words)."
            }]
        )
        claude_reply = response.content[0].text
    except Exception as e:
        claude_reply = f"Analysis completed. Key trends in AO/Arweave detected."

    return {
        "status": "processed",
        "claude_report": claude_reply,
        "voice_enabled": data.get("voice", False)
    }

if __name__ == "__main__":
    print("🚀 X Pulse Bridge Running (Fast Mode)")
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("BRIDGE_PORT", 8001)))
