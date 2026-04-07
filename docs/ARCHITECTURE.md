# X Pulse Monitor Architecture

## Overview
Hybrid CLI + Web system for autonomous X monitoring using Claude + AO.

## Components

### 1. CLI (`apps/cli`)
- `x-pulse init` → Setup wizard
- `x-pulse monitor` → One-off monitoring
- `x-pulse start-multi-agent` → Autonomous loop

### 2. Bridge (`packages/bridge`)
- FastAPI backend
- Claude integration
- Simulated AO storage

### 3. Dashboard (`apps/web`)
- Next.js UI
- Calls Bridge API

### 4. AO (`packages/ao-processes`)
- Lua agents for persistent execution

### 5. Dev Tools
- `scripts/dev-start.sh` → Starts Bridge + MCP
