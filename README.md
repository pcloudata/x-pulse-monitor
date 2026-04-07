# X Pulse Monitor

**Autonomous X (Twitter) monitoring SaaS powered by Claude + AO**

A hybrid CLI + Web tool that turns X into real-time intelligence for autonomous agents.

## What it does

- Monitor any topic, keyword, or account on X in real-time
- Get structured, high-signal insights powered by **Claude (Sonnet 4.6)**
- Run persistent autonomous agents on **AO (Arweave)**
- Store insights permanently and verifiably on Arweave
- Enable voice output (ElevenLabs)

## Quick Start

git clone https://github.com/pcloudata/x-pulse-monitor.git
cd x-pulse-monitor

pnpm install

### 1. Setup API keys (one-time)
pnpm cli:init

### 2. Start services
./scripts/dev-start.sh

In a new terminal:

### Run autonomous monitoring with voice
pnpm cli start-multi-agent --voice

### Or run a one-time monitor
pnpm cli monitor "AO Arweave"

### Open the web dashboard:

cd apps/web && pnpm dev

## Current Features
 Full Type Script CLI (x-pulse)
 Interactive setup wizard (pnpm cli:init)
 Real Claude integration with structured insights
 Simple MCP bridge for X data
 Next.js web dashboard
 Voice output via ElevenLabs (Phase 1)
 One-command development environment (./scripts/dev-start.sh)
 AO agent skeleton (Lua processes)



Note: Currently using a lightweight Simple MCP for stability and speed of development. Official X MCP integration is planned as a future upgrade.

## Project Structure

x-pulse-monitor/
├── apps/cli/              → Main CLI tool (x-pulse)
├── apps/web/              → Next.js dashboard
├── packages/bridge/       → FastAPI backend + Claude
├── packages/ao-processes/ → AO Lua agents
├── mcp/simple-mcp/        → Lightweight X tools interface
├── docs/                  → Architecture, usage, troubleshooting
├── scripts/               → dev-start.sh
└── tests/                 → Basic unit tests

## How to Contribute
Contributions are very welcome!
I'm especially looking for help in these areas:
Real AO deployment and Arweave storage
Full official XMCP integration
Two-way voice conversations
Dashboard improvements
Better test coverage

Made for developers and autonomous agent builders. Star if you're building in the AO + AI space!