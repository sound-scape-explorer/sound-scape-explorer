$NEXT_VERSION = $env:NEXT_VERSION

if ($null -eq $NEXT_VERSION)
{
    Write-Host "NEXT_VERSION environment variable is not set."
    exit 1
}

(Get-Content -Path "front/src/version.ts") -replace 'VERSION = (.+)', "VERSION = '$NEXT_VERSION';" | Set-Content -Path "front/src/version.ts"
(Get-Content -Path "audio/src/version.ts") -replace 'VERSION = (.+)', "VERSION = '$NEXT_VERSION';" | Set-Content -Path "audio/src/version.ts"
(Get-Content -Path "audio/src/version.ts") -replace 'VERSION = (.+)', "VERSION = '$NEXT_VERSION';" | Set-Content -Path "visualisation/src/version.ts"
(Get-Content -Path "processing/pyproject.toml") -replace 'version = (.+)', "version = `"$NEXT_VERSION`"," | Set-Content -Path "processing/pyproject.toml"
