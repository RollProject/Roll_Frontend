@echo off
echo Starting Vite development server with administrator privileges...
cd /d "C:\GitRepo\Roll_Frontend"
powershell -Command "Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd C:\GitRepo\Roll_Frontend; npm run dev' -Verb RunAs"
pause