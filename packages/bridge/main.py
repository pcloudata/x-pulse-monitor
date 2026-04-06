from fastapi import FastAPI, Request
from dotenv import load_dotenv
import uvicorn
import os
import json
from anthropic import Anthropic
import httpx

load_dotenv(override=True)

app = FastAPI(title="X Pulse Bridge")
anthropic = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

AO_GATEWAY = "https://cu.ao-testnet.xyz"  # Change to mainnet later

@app.post("/ao-to-claude")
async def ao_to_claude(request: Request):
    data = await request.json()
    task = data.get("task", "No task")
    voice = data.get("voice", False)

    print(f"📨 AO → Claude: {task}")

    # Get insights from Claude
    try:
        response = anthropic.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=600,
            messages=[{"role": "user", "content": f"Task: {task}. Give concise insights."}]
        )
        claude_reply = response.content[0].text
    except Exception as e:
        claude_reply = f"Claude Error: {str(e)}"

    # Simulate sending to AO (in real version we'll use real Process ID)
    ao_response = {
        "status": "stored",
        "arweave_tx": "simulated-tx-id-" + os.urandom(4).hex(),
        "message": "Insights permanently stored on Arweave"
    }

    return {
        "status": "processed",
        "claude_thought": claude_reply[:400],
        "ao_response": ao_response,
        "voice_enabled": voice
    }

if __name__ == "__main__":
    print("🚀 X Pulse Bridge + AO Integration Ready")
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("BRIDGE_PORT", 8001)))
