@echo off

set version=14.0.0-beta.6
set venv=sse-processing-%version%
set script="%venv%\Scripts\Activate.ps1"

if not exist %script% (
    echo Creating virtual environment...
    python3.11 -m venv %venv%

    echo Activating virtual environment...
    %venv%\Scripts\activate

    echo Upgrading pip...
    python.exe -m pip install --upgrade pip

    echo Installing SoundScapeExplorer...
    pip install sound-scape-explorer==%version%
    sse_download

    start /B powershell.exe -ExecutionPolicy Bypass -NoExit -Command "& %script%"
)

start /B powershell.exe -ExecutionPolicy Bypass -NoExit -Command "& %script%"
