@echo off
title music-login-stop
echo Stopping music-login dev server (port 5173)...
echo.

REM Kill the process that is listening on port 5173
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr ":5173" ^| findstr "LISTENING"') do (
    echo   killing PID %%a (port 5173)
    taskkill /F /PID %%a >nul 2>&1
)

REM Fallback: close the window opened by start.bat
taskkill /F /FI "WINDOWTITLE eq music-login-dev" >nul 2>&1

echo.
echo Done. The dev server has been stopped.
echo (If nothing was killed, it was probably not running.)
echo.
pause
