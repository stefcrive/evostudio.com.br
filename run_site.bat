@echo off
setlocal

where npm.cmd >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Node.js/NPM was not found in PATH.
  echo Install Node.js from https://nodejs.org/ and re-run this script.
  exit /b 1
)

if not exist node_modules (
  echo Installing dependencies...
  call npm.cmd install
  if errorlevel 1 (
    echo [ERROR] Dependency installation failed.
    exit /b 1
  )
)

echo Starting site...
call npm.cmd run dev
