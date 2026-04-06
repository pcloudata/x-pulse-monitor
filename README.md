# X Pulse Monitor

**Autonomous social intelligence platform** — Real-time X monitoring powered by **Claude + AO agents**.

Monitor keywords, brands, or topics on X, get intelligent insights, store results permanently on Arweave, and enable voice conversations between agents.

## ✨ Features

- Real-time X data via MCP
- Claude-powered analysis and reasoning
- Persistent & verifiable AO agents
- Voice-enabled agent-to-agent conversation (Claude ↔ AO)
- Easy-to-use CLI (`x-pulse`)
- Hybrid architecture (CLI + future Web Dashboard)

## Quick Start

```bash
git clone https://github.com/pcloudata/x-pulse-monitor.git
cd x-pulse-monitor
pnpm install

# Run interactive setup
pnpm cli:init

Start the systembash

# Terminal 1: Start Bridge + MCP
cd packages/bridge && ./start.sh

# Terminal 2: Start Simple MCP
cd ../../mcp/simple-mcp && ./start.sh

# Terminal 3: Run monitoring
pnpm cli monitor "AO Arweave" --voice

Available CLI Commandspnpm cli:init — Setup wizard (API keys)
pnpm cli monitor "<query>" [--voice] — Start monitoring
pnpm cli start-multi-agent [--voice] — Full autonomous loop (coming soon)

Project Structure

x-pulse-monitor/
├── apps/cli/          → x-pulse command line tool
├── apps/web/          → Future SaaS dashboard
├── packages/bridge/   → Python backend (Claude + Bridge)
├── mcp/simple-mcp/    → X tool interface
├── packages/ao-processes/ → AO Lua agents
└── README.md

Tech StackCLI: TypeScript + Commander.js
AI: Anthropic Claude + MCP
Backend: FastAPI + Python
Decentralized Compute: AO + Arweave
Voice: ElevenLabs + Whisper (planned)

RoadmapCLI + Interactive setup
Bridge + MCP integration
Full autonomous multi-agent system
Real official XMCP
Beautiful Next.js dashboard
One-command dev environment

Made for builders in the AO + AI Agent ecosystem.Star  if you're excited about autonomous social agents!