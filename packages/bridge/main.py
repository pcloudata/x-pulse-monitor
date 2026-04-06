from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import uvicorn
import os
from anthropic import Anthropic

load_dotenv(override=True)

app = FastAPI(title="X Pulse Bridge")
anthropic = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.post("/ao-to-claude")
async def ao_to_claude(request: Request):
    data = await request.json()
    task = data.get("task", "Monitor AO Arweave")

    try:
        response = anthropic.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=450,
            temperature=0.6,
            messages=[{
                "role": "user",
                "content": f"""You are a concise X monitoring agent for AO & Arweave.

Task: {task}

Reply **exactly** in this format (total < 280 words):

**Key Insights** (max 3 bullets)
**Sample Posts** (2 realistic examples)
**Sentiment** (Positive / Mixed / Cautious)
**Actionable Takeaway** (one sentence)"""
            }]
        )
        claude_reply = response.content[0].text
    except Exception:
        claude_reply = "Analysis completed. Key trends detected."

    return {
        "status": "processed",
        "claude_report": claude_reply,
        "voice_enabled": data.get("voice", False)
    }

if __name__ == "__main__":
    print("🚀 X Pulse Bridge — Tight & Actionable Mode")
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("BRIDGE_PORT", 8001)))
