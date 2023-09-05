$scriptPath = Split-Path -Parent -Path $MyInvocation.MyCommand.Definition
Start-Process powershell -ArgumentList "-NoExit","-Command cd '$scriptPath'" -Verb RunAs

