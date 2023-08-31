#! /usr/bin/pwsh

$binary = "node"
$selected_binary = $null
$version = $null
$path = $null

if (Get-Command $binary -ErrorAction SilentlyContinue) {
  $selected_binary = $binary
}

if ($selected_binary -eq $null) {
    Write-Host "git not found!"
} else {
    Write-Host $binary
    $version = Invoke-Expression "$selected_binary --version"
    Write-Host "Version: $version"
    $path = Get-Command $binary
    Write-Host "Path: $path"
}
