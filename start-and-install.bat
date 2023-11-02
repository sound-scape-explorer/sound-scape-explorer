@echo off

if not exist "venv\Scripts\Activate.ps1" (
    echo Creating virtual environment...
    python3.10 -m venv venv

    echo.
    echo Installing visualisation packages...
    pnpm i
    pnpm install:front

    echo.
    echo Please now install processing module packages manually...
)

start /B powershell.exe -ExecutionPolicy Bypass -NoExit -Command "& 'venv\Scripts\Activate.ps1'"
