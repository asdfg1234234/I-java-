@echo off
setlocal EnableExtensions

echo Stopping Vue dev server on port 5173 ...

set "KPID="
for /f "tokens=5" %%P in ('netstat -ano ^| findstr ":5173" ^| findstr "LISTENING"') do (
    set "KPID=%%P"
)

if not defined KPID (
    echo No server running on port 5173.
) else (
    echo Killing PID %KPID% ...
    taskkill /PID %KPID% /F >nul 2>&1
    echo Server stopped.
)

timeout /t 2 /nobreak >nul
