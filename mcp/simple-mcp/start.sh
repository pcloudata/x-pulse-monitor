#!/bin/bash
source venv/bin/activate 2>/dev/null || {
  python -m venv venv
  source venv/bin/activate
  pip install -r requirements.txt
}
python main.py
