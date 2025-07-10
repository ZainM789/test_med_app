@echo off
echo Starting Medical App Backend Server...
echo.

echo Checking if Node.js is installed...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo Starting MongoDB (if not already running)...
start /B mongod --dbpath "C:\data\db" 2>nul
echo Waiting for MongoDB to start...
timeout /t 3 /nobreak >nul

echo.
echo Installing server dependencies...
cd server
npm install

echo.
echo Starting Backend Server on port 8181...
echo Backend will be available at: http://localhost:8181
echo.
npm start

pause
