<#
    Renders the Open Graph card to assets/img/og.png (1200x630).

        pwsh tools/build-og.ps1

    That image is what WhatsApp, LinkedIn, Slack and X show when the CV
    link is pasted. Re-run it if the headline, the photo or the palette
    changes; the source is tools/og/og.html.
#>

[CmdletBinding()]
param([int]$Port = 4398)

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$out  = Join-Path $root 'assets/img/og.png'

$candidates = @(
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe"
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe"
    "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
    "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
    "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
)
$browser = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $browser) { throw 'No Chrome or Edge found.' }

$python = (Get-Command python -ErrorAction SilentlyContinue)?.Source
if (-not $python) { throw 'python is required to serve the page while rendering.' }

$server = Start-Process -FilePath $python `
    -ArgumentList @('-m', 'http.server', "$Port", '--bind', '127.0.0.1') `
    -WorkingDirectory $root -PassThru -WindowStyle Hidden

try {
    $ready = $false
    foreach ($i in 1..60) {
        Start-Sleep -Milliseconds 100
        try {
            $c = [Net.Sockets.TcpClient]::new()
            $c.Connect('127.0.0.1', $Port)
            $ready = $c.Connected; $c.Close()
            if ($ready) { break }
        } catch { }
    }
    if (-not $ready) { throw "Local server did not come up on port $Port." }

    $profile = Join-Path ([IO.Path]::GetTempPath()) ("cv-og-" + [guid]::NewGuid())

    $proc = Start-Process -FilePath $browser -PassThru -NoNewWindow -ArgumentList @(
        '--headless'
        '--disable-gpu'
        '--no-first-run'
        '--no-default-browser-check'
        "--user-data-dir=$profile"
        '--hide-scrollbars'
        '--force-device-scale-factor=1'
        '--window-size=1200,630'
        '--virtual-time-budget=5000'
        "--screenshot=$out"
        "http://127.0.0.1:$Port/tools/og/og.html"
    )

    if (-not $proc.WaitForExit(60000)) {
        $proc.Kill($true)
        throw 'The browser hung while rendering the card.'
    }

    Remove-Item -Recurse -Force $profile -ErrorAction SilentlyContinue

    if (-not (Test-Path $out)) { throw "Failed to produce $out" }
    Write-Host ("built   : assets/img/og.png ({0} KB)" -f [math]::Round((Get-Item $out).Length / 1KB))
}
finally {
    if ($server -and -not $server.HasExited) { Stop-Process -Id $server.Id -Force }
}
