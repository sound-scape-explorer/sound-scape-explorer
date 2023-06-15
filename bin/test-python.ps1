#!/usr/bin/pwsh

# Helpers

function print_new_line() {
    Write-Host ""
}

# Variables

$python_versions = "python","python3"
$selected_python_version = $null
$python_version = $null
$python_path = $null

$pip_versions = "pip","pip3"
$selected_pip_version = $null
$pip_version = $null
$pip_path = $null

# Runtime

foreach ($python_version in $python_versions) {
    if (Get-Command $python_version -ErrorAction SilentlyContinue) {
        $selected_python_version = $python_version
        break
    }
}

foreach ($pip_version in $pip_versions) {
    if (Get-Command $pip_version -ErrorAction SilentlyContinue) {
        $selected_pip_version = $pip_version
        break
    }
}

if (-not $selected_python_version) {
    Write-Host "Python not found!"
}
else {
    Write-Host $selected_python_version

    $python_version = Invoke-Expression "$selected_python_version --version"
    Write-Host "Version: $python_version"

    $python_path = Get-Command "$selected_python_version"
    Write-Host "Path: $python_path"
}

print_new_line

if (-not $selected_pip_version) {
    Write-Host "pip not found!"
}
else {
    Write-Host $selected_pip_version
    
    $pip_version = Invoke-Expression "$selected_pip_version --version"
    Write-Host "Version: $pip_version"

    $pip_path = Get-Command "$selected_pip_version"
    Write-Host "Path: $pip_path"
}

print_new_line
