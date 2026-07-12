@echo off
setlocal
cd /d "%~dp0"

echo ============================================
echo   Rodrigo Barbosa - Portfolio
echo ============================================
echo.

if not exist "node_modules" (
    echo A instalar dependencias, aguarda um momento...
    call npm install
    if errorlevel 1 (
        echo.
        echo Ocorreu um erro ao instalar as dependencias.
        pause
        exit /b 1
    )
)

echo A iniciar o servidor local em http://localhost:3000 ...
start "" http://localhost:3000
call npm run dev

pause
