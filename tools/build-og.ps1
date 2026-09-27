<#
    Renders the page-shaped images by screenshotting real pages.

        pwsh tools/build-og.ps1

    assets/img/og.png            1200x630, the card WhatsApp, LinkedIn,
                                 Slack and X show when the link is pasted.
                                 Source: tools/og/og.html

    assets/img/linkedin-cover.png  1584x396, the profile banner. It is the
                                 site's own dark background, captured at
                                 LinkedIn's size. Source: tools/og/cover.html

    Re-run after changing the headline, the photo or the palette.
#>

[CmdletBinding()]
param([int]$Port = 4398)

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot

# page -> output file, at the exact pixel size each platform expects
# page -> output file. W/H is the image each platform expects; ShotH is the
# window height used to take it. Headless Chrome on Windows refuses windows
# shorter than roughly 302px, so anything shorter is rendered tall and
# cropped back to H.
$shots = @(
    @{ Page = 'tools/og/og.html';    Out = 'assets/img/og.png';            W = 1200; H = 630; ShotH = 630 }
    @{ Page = 'tools/og/cover.html'; Out = 'assets/img/linkedin-cover.png'; W = 1584; H = 396; ShotH = 700 }
)

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

    foreach ($shot in $shots) {
        $out = Join-Path $root $shot.Out
        $profile = Join-Path ([IO.Path]::GetTempPath()) ("cv-og-" + [guid]::NewGuid())

        $proc = Start-Process -FilePath $browser -PassThru -NoNewWindow -ArgumentList @(
            '--headless'
            '--disable-gpu'
            '--no-first-run'
            '--no-default-browser-check'
            "--user-data-dir=$profile"
            '--hide-scrollbars'
            '--force-device-scale-factor=1'
            ("--window-size={0},{1}" -f $shot.W, $shot.ShotH)
            '--virtual-time-budget=5000'
            "--screenshot=$out"
            ("http://127.0.0.1:$Port/" + $shot.Page)
        )

        if (-not $proc.WaitForExit(60000)) {
            $proc.Kill($true)
            throw ("The browser hung while rendering " + $shot.Out)
        }

        Remove-Item -Recurse -Force $profile -ErrorAction SilentlyContinue

        if (-not (Test-Path $out)) { throw "Failed to produce $out" }

        if ($shot.ShotH -ne $shot.H) {
            & $python -c "from PIL import Image; im = Image.open(r'$out'); im.crop((0, 0, $($shot.W), $($shot.H))).save(r'$out')"
            if ($LASTEXITCODE -ne 0) { throw "Could not crop $out - is Pillow installed?" }
        }

        $img = & $python -c "from PIL import Image; print('x'.join(map(str, Image.open(r'$out').size)))"
        Write-Host ("built   : {0,-32} {1,-10} {2,4} KB" -f
            $shot.Out, $img, [math]::Round((Get-Item $out).Length / 1KB))
    }
}
finally {
    if ($server -and -not $server.HasExited) { Stop-Process -Id $server.Id -Force }
}
