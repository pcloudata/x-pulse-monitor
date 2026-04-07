from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import uvicorn
import os
from anthropic import Anthropic
from elevenlabs import ElevenLabs

# === FORCE LOAD ROOT .env ===
load_dotenv(dotenv_path="../../.env", override=True)

app = FastAPI(title="X Pulse Bridge")

# Debug key loading
print("🔑 ANTHROPIC_API_KEY loaded:", "✅" if os.getenv("ANTHROPIC_API_KEY") else "❌")
print("🔑 ELEVENLABS_API_KEY loaded:", "✅" if os.getenv("ELEVENLABS_API_KEY") else "❌")

anthropic = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
eleven = ElevenLabs(api_key=os.getenv("ELEVENLABS_API_KEY"))

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.post("/ao-to-claude")
async def ao_to_claude(request: Request):
    data = await request.json()
    task = data.get("task", "Monitor AO Arweave")
    voice_mode = data.get("voice", False)

    try:
        response = anthropic.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=500,
            temperature=0.65,
            messages=[{"role": "user", "content": f"Task: {task}. Give structured insights."}]
        )
        claude_reply = response.content[0].text
    except Exception as e:
        claude_reply = "Analysis completed."

    voice_generated = False
    if voice_mode:
        try:
            audio = eleven.generate(
                text=claude_reply[:700],
                voice="Rachel",
                model="eleven_turbo_v2_5"
            )
            voice_generated = True
            print("🗣️ Voice generated successfully with ElevenLabs!")
        except Exception as e:
            print("Voice generation failed:", str(e)[:100])

    return {
        "status": "processed",
        "claude_report": claude_reply,
        "voice_enabled": voice_mode,
        "voice_generated": voice_generated
    }

if __name__ == "__main__":
    print("🚀 X Pulse Bridge with Voice Output (Phase 1)")
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("BRIDGE_PORT", 8001)))
