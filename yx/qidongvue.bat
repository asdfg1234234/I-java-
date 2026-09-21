@echo off
setlocal EnableExtensions
cd /d "%~dp0"

set "NPM=C:\Users\w3329\.workbuddy\binaries\node\versions\22.22.2-2\npm.cmd"
set "EDGE=C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
set "URL=http://127.0.0.1:5173/login"

echo ============================================
echo   Vue Auth Dev Server  (port 5173)
echo ============================================

REM if a server is already listening on 5173, just open the page
netstat -ano | findstr ":5173" | findstr "LISTENING" >nul
if not errorlevel 1 goto already

if not exist "node_modules" (
    echo Installing dependencies, please wait...
    call "%NPM%" install
    if errorlevel 1 (
        echo Dependency install FAILED. Screenshot this window.
        pause
        exit /b 1
    )
)

echo Starting dev server in a separate window (VueDevServer) ...
start "VueDevServer" cmd /k call "%NPM%" run dev -- --port 5173 --host 127.0.0.1

echo Waiting for the server to be ready ...
set /a TRIES=0
:waitloop
timeout /t 2 /nobreak >nul
set /a TRIES+=1
if %TRIES% geq 30 goto openit
netstat -ano | findstr ":5173" | findstr "LISTENING" >nul
if errorlevel 1 goto waitloop

:openit
if exist "%EDGE%" goto openedge
echo Edge not found, opening default browser...
start "" "%URL%"
goto done
:openedge
start "" "%EDGE%" "%URL%"
goto done
:done
echo.
echo Page opened: %URL%
echo To stop the server: close the VueDevServer window,
echo or double-click the close script.
echo.
pause
exit /b 0

:already
echo Server is ALREADY running on port 5173 - just opening the page...
if exist "%EDGE%" goto openedge2
start "" "%URL%"
goto done2
:openedge2
start "" "%EDGE%" "%URL%"
goto done2
:done2
timeout /t 3 /nobreak >nul
exit /b 0
