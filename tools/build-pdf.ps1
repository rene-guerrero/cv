<#
    Regenerates the downloadable PDFs from index.html.

    Run it after changing anything in assets/js/data.js, otherwise the
    PDF people download will be older than the page they are reading.

        pwsh tools/build-pdf.ps1

    It serves the site on a scratch port, drives a headless Chromium over
    --print-to-pdf, and writes one file per language. The output is real
    vector text: selectable, searchable and small, not a screenshot.

    Two sets come out of this:

      assets/pdf/   public, committed, linked from the PDF button.
                    No phone number: the repo is public and so is anything
                    served from it, PDFs very much included.

      private/      only built when tools/private.local.json exists, and
                    ignored by git. Same CV plus the phone number - this is
                    the one to attach when applying somewhere.
#>

[CmdletBinding()]
param(
    [int]$Port = 4399,
    [string[]]$Languages = @('en', 'es')
)

$ErrorActionPreference = 'Stop'

$root    = Split-Path -Parent $PSScriptRoot
$outDir  = Join-Path $root 'assets/pdf'
$privDir = Join-Path $root 'private'
$privCfg = Join-Path $PSScriptRoot 'private.local.json'

$tel = $null
if (Test-Path $privCfg) {
    $tel = (Get-Content $privCfg -Raw | ConvertFrom-Json).tel
}

# ── locate a Chromium ────────────────────────────────────────────────
# Chrome and Edge first: Brave's headless mode hangs on --print-to-pdf,
# so it sits last here as a fallback only.
$candidates = @(
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe"
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe"
    "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
    "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
    "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe"
    "$env:ProgramFiles\BraveSoftware\Brave-Browser\Application\brave.exe"
)
$browser = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $browser) {
    throw 'No Chrome/Edge/Brave found. Install one, or add its path to $candidates.'
}
Write-Host "browser : $browser"

# ── locate python for the static server ──────────────────────────────
$python = (Get-Command python -ErrorAction SilentlyContinue)?.Source
if (-not $python) { $python = (Get-Command py -ErrorAction SilentlyContinue)?.Source }
if (-not $python) { throw 'python is required to serve the site while printing.' }

New-Item -ItemType Directory -Force -Path $outDir | Out-Null

# ── serve, print, stop ───────────────────────────────────────────────
$server = Start-Process -FilePath $python `
    -ArgumentList @('-m', 'http.server', "$Port", '--bind', '127.0.0.1') `
    -WorkingDirectory $root -PassThru -WindowStyle Hidden

try {
    # Wait for the port to answer with a plain socket probe —
    # Test-NetConnection takes seconds per call on Windows.
    $ready = $false
    foreach ($i in 1..60) {
        Start-Sleep -Milliseconds 100
        try {
            $client = [Net.Sockets.TcpClient]::new()
            $client.Connect('127.0.0.1', $Port)
            $ready = $client.Connected
            $client.Close()
            if ($ready) { break }
        } catch { }
    }
    if (-not $ready) { throw "Local server did not come up on port $Port." }

    # each job: where the file goes, and the query the page is rendered with
    $jobs = @()
    foreach ($lang in $Languages) {
        $jobs += @{
            Out   = Join-Path $outDir ("Rene-Guerrero-CV-" + $lang.ToUpper() + ".pdf")
            Query = "?lang=$lang"
            Tag   = 'public'
        }
        if ($tel) {
            $jobs += @{
                Out   = Join-Path $privDir ("Rene-Guerrero-CV-" + $lang.ToUpper() + "-private.pdf")
                Query = "?lang=$lang&tel=" + [uri]::EscapeDataString($tel)
                Tag   = 'private'
            }
        }
    }

    if ($tel) { New-Item -ItemType Directory -Force -Path $privDir | Out-Null }

    foreach ($job in $jobs) {
        $out = $job.Out
        $profile = Join-Path ([IO.Path]::GetTempPath()) ("cv-pdf-" + [guid]::NewGuid())

        $proc = Start-Process -FilePath $browser -PassThru -NoNewWindow -ArgumentList @(
            '--headless'
            '--disable-gpu'
            '--no-first-run'
            '--no-default-browser-check'
            "--user-data-dir=$profile"
            '--virtual-time-budget=6000'
            '--no-pdf-header-footer'
            "--print-to-pdf=$out"
            ("http://127.0.0.1:$Port/" + $job.Query)
        )

        # a hung headless browser must not wedge the build
        if (-not $proc.WaitForExit(60000)) {
            $proc.Kill($true)
            throw "$browser hung while printing $out. Try Chrome or Edge instead."
        }

        Remove-Item -Recurse -Force $profile -ErrorAction SilentlyContinue

        if (-not (Test-Path $out)) { throw "Failed to produce $out" }
        $kb = [math]::Round((Get-Item $out).Length / 1KB)
        Write-Host ("built   : {0,-40} {1,4} KB  [{2}]" -f (Split-Path $out -Leaf), $kb, $job.Tag)
    }

    if (-not $tel) {
        Write-Host 'note    : tools/private.local.json not found - no private PDF built.'
    }
}
finally {
    if ($server -and -not $server.HasExited) { Stop-Process -Id $server.Id -Force }
}

Write-Host 'done.'
