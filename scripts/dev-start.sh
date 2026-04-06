#!/bin/bash
echo "🚀 Starting X Pulse Monitor Development Environment..."

# Kill any existing services
pkill -f "uvicorn main:app" 2>/dev/null || true

echo "📡 Starting Simple MCP Server..."
(cd mcp/simple-mcp && ./start.sh) &
MCP_PID=$!
sleep 3

echo "🔗 Starting X Pulse Bridge..."
(cd packages/bridge && ./start.sh) &
BRIDGE_PID=$!
sleep 2

echo ""
echo "✅ Both services are running!"
echo "   MCP    → http://127.0.0.1:8000/mcp"
echo "   Bridge → http://127.0.0.1:8001"
echo ""
echo "You can now run in a new terminal:"
echo "   pnpm cli monitor \"AO Arweave agents\" --voice"
echo "   or"
echo "   pnpm cli start-multi-agent --voice"
echo ""
echo "Press Ctrl+C **once** to stop everything gracefully."

# Clean shutdown
trap '
  echo -e "\n\n🛑 Shutting down services..."
  kill $MCP_PID $BRIDGE_PID 2>/dev/null
  wait $MCP_PID $BRIDGE_PID 2>/dev/null
  echo "✅ All services stopped."
  exit 0
' SIGINT

# Keep the script alive
wait
