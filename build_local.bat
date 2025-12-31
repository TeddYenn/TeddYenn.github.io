@echo off
echo ==========================================
echo      Building Website Locally
echo ==========================================

echo.
echo [1/3] Checking/Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Failed to install dependencies.
    pause
    exit /b %errorlevel%
)

echo.
echo [2/3] Building the project...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed.
    pause
    exit /b %errorlevel%
)

echo.
echo [3/3] Build complete! The 'dist' folder is ready.
echo.
echo Starting local preview server...
echo (Press Ctrl+C to stop the server)
echo.
call npm run preview
pause
