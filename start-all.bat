@echo off
echo =========================================
echo Starting TrafficHive Backend and Frontend
echo =========================================

echo Starting Backend...
start cmd /k "cd /d ""c:\Users\HARSH KUMAR\OneDrive\Desktop\Traffic-signal-main\backend"" && uvicorn app:app --reload --port 8000"

echo Starting Frontend...
start cmd /k "npm run dev"

echo Both servers are starting in separate windows.
