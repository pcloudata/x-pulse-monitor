# X Pulse Monitor

**Autonomous X (Twitter) monitoring SaaS** built with **Claude + AO agents**.

Real-time social intelligence: Monitor keywords, get Claude-powered insights, store results permanently on Arweave, and enable agent-to-agent conversations.

## Current Status

- ✅ CLI-first experience (`x-pulse`)
- ✅ Real Claude 3.5 Sonnet integration
- ✅ Bridge + MCP system
- ✅ One-command dev environment
- ✅ Multi-agent loop (Claude ↔ AO simulation)
- 🔄 AO persistent agents (in progress)
- 🔄 Web Dashboard (planned)
- 🔄 Voice conversations (planned)

## Quick Start

```bash
git clone <your-repo>
cd x-pulse-monitor
pnpm install

# 1. Setup (one time)
pnpm cli:init

# 2. Start services
./scripts/dev-start.sh

Main Commandsbash

# Monitor a topic
pnpm cli monitor "AO Arweave" --voice

# Start autonomous multi-agent loop
pnpm cli start-multi-agent --voice

Developmentbash

# Start everything with one command
./scripts/dev-start.sh

# In another terminal:
pnpm cli start-multi-agent --voice

Project Structureapps/cli/ — Main x-pulse tool (developer friendly)
packages/bridge/ — Python backend (Claude + logic)
mcp/simple-mcp/ — X tools interface
packages/ao-processes/ — AO Lua agents
scripts/dev-start.sh — One-command local dev

Tech StackCLI: TypeScript + Commander.js
AI: Claude 3.5 Sonnet (real API)
Backend: FastAPI
Decentralized: AO + Arweave (coming)
Dev Experience: Clean scripts and CLI

RoadmapCLI foundation + init wizard
Real Claude integration
Multi-agent loop
Real AO persistent processes
Web Dashboard
Voice agent conversations (ElevenLabs)
Official XMCP integration

Made for developers and autonomous agent builders.Star  if you're building in the AO + AI space!