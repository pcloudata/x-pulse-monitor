#!/bin/bash
echo "🚀 Starting X Pulse Monitor Development Environment..."

# Kill any existing services
pkill -f "uvicorn main:app" 2>/dev/null || true

ROOT="$(pwd)"

echo "📡 Starting Simple MCP Server (port 8000)..."
(cd "$ROOT/mcp/simple-mcp" && ./start.sh) &
MCP_PID=$!
sleep 3

echo "🔗 Starting X Pulse Bridge (port 8001)..."
(cd "$ROOT/packages/bridge" && ./start.sh) &
BRIDGE_PID=$!
sleep 2

echo ""
echo "✅ Both services started successfully!"
echo "   MCP    → http://127.0.0.1:8000/mcp"
echo "   Bridge → http://127.0.0.1:8001"
echo ""
echo "You can now run in a **new terminal**:"
echo "   pnpm cli start-multi-agent --voice"
echo "   or"
echo "   pnpm cli monitor \"AO Arweave agents\" --voice"
echo ""
echo "Press Ctrl+C to stop everything."

trap '
  echo -e "\n\n🛑 Shutting down services..."
  kill $MCP_PID $BRIDGE_PID 2>/dev/null
  echo "✅ All services stopped."
  exit 0
' SIGINT

wait
