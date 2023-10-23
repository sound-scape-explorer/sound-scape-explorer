@echo off

if not exist "venv\Scripts\Activate.ps1" (
    echo Creating virtual environment...
    python3.10 -m venv venv
)

start /B powershell.exe -ExecutionPolicy Bypass -NoExit -Command "& 'venv\Scripts\Activate.ps1'"
