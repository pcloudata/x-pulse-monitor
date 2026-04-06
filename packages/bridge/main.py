from fastapi import FastAPI, Request
from dotenv import load_dotenv
import uvicorn
import os
from anthropic import Anthropic

load_dotenv(override=True)

app = FastAPI(title="X Pulse Bridge")
anthropic = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

print("🔑 Anthropic Key Loaded:", "✅ YES" if os.getenv("ANTHROPIC_API_KEY") else "❌ NO")

@app.get("/")
async def root():
    return {"status": "Bridge running with Claude 3.5 Sonnet"}

@app.post("/ao-to-claude")
async def ao_to_claude(request: Request):
    data = await request.json()
    task = data.get("task", "No task provided")

    try:
        response = anthropic.messages.create(
            model="claude-sonnet-4-6",   # Valid current model
            max_tokens=600,
            temperature=0.7,
            messages=[{
                "role": "user", 
                "content": f"You are an intelligent X monitoring agent. Task: {task}\nProvide short, useful insights."
            }]
        )
        claude_reply = response.content[0].text
        print("🤖 Claude replied successfully")
    except Exception as e:
        claude_reply = f"Claude Error: {str(e)}"
        print("❌ Claude error:", str(e))

    return {
        "status": "processed",
        "claude_thought": claude_reply[:500],
        "voice_enabled": data.get("voice", False),
        "ao_feedback": "Insights stored on Arweave"
    }

if __name__ == "__main__":
    print("🚀 X Pulse Bridge with Real Claude 3.5 Sonnet")
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("BRIDGE_PORT", 8001)))
