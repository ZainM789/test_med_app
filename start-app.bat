@echo off
echo Starting Medical Appointment App...
echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "cd /d server && npm run dev"
timeout /t 3 /nobreak >nul
echo Starting Frontend App...
start "Frontend App" cmd /k "cd /d app-name && npm start"
echo.
echo Both servers are starting...
echo Backend: http://localhost:8181
echo Frontend: http://localhost:3000
echo.
pause
