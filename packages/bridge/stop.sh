#!/bin/bash
pkill -f "uvicorn main:app" || echo "Bridge not running"
echo "Bridge stopped."
