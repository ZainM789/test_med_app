@echo off
echo Starting Medical App...
echo.

echo Starting MongoDB (if not already running)...
start /B mongod --dbpath "C:\data\db" 2>nul

echo Waiting for MongoDB to start...
timeout /t 3 /nobreak >nul

echo Starting Backend Server...
cd server
start /B npm start

echo Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo Starting Frontend...
cd ..\app-name
npm start

echo.
echo Medical App is starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
pause
