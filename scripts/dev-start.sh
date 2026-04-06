#!/bin/bash
echo "🚀 Starting X Pulse Monitor Development Environment..."

# Kill any existing services
pkill -f "uvicorn main:app" 2>/dev/null || true

echo "📡 Starting Simple MCP Server..."
(cd mcp/simple-mcp && ./start.sh > /dev/null 2>&1) &
MCP_PID=$!
sleep 3

echo "🔗 Starting X Pulse Bridge..."
(cd packages/bridge && ./start.sh > /dev/null 2>&1) &
BRIDGE_PID=$!
sleep 2

echo ""
echo "✅ Both services are running in background!"
echo "   MCP    → http://127.0.0.1:8000/mcp"
echo "   Bridge → http://127.0.0.1:8001"
echo ""
echo "You can now run in a new terminal:"
echo "   pnpm cli monitor \"AO Arweave agents\" --voice"
echo "   or"
echo "   pnpm cli start-multi-agent --voice"
echo ""
echo "Press Ctrl+C once to stop everything."

# Clean & quiet shutdown
trap '
  echo -e "\n\n🛑 Shutting down services..."
  kill $MCP_PID $BRIDGE_PID 2>/dev/null
  sleep 1
  echo "✅ All services stopped cleanly."
  exit 0
' SIGINT

wait
