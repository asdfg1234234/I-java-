@echo off
cd /d "%~dp0"
echo Starting music-login dev server...
echo Open http://localhost:5173 in your browser when ready.
start "music-login-dev" /min cmd /c "npm run dev"
timeout /t 5 >nul
start "" "http://localhost:5173/"
echo Dev server is running in a minimized window (music-login-dev).
echo Close that window to stop the server.
pause
