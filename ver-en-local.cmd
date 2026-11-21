@echo off
rem ============================================================
rem  Pachanka - Carta digital
rem  Doble clic para ver la carta en este computador, sin subir
rem  nada. Abre el navegador y deja el servidor corriendo:
rem  cierra esta ventana para apagarlo.
rem ============================================================
chcp 65001 >nul
cd /d "%~dp0"
title Pachanka - Carta digital (local)
set "PORT=8181"

set "PY="
where python >nul 2>nul && set "PY=python"
if not defined PY where py >nul 2>nul && set "PY=py"
if not defined PY (
  echo.
  echo   No encontre Python en este computador.
  echo   Instalalo desde https://www.python.org/downloads/  ^(marca "Add to PATH"^)
  echo   y vuelve a dar doble clic aqui.
  echo.
  pause
  exit /b 1
)

echo.
echo   Carta digital de Pachanka
echo   ------------------------------------------------
echo   Abriendo  http://127.0.0.1:%PORT%/
echo.
echo   Cierra esta ventana cuando termines.
echo.
start "" "http://127.0.0.1:%PORT%/"
%PY% -m http.server %PORT% --bind 127.0.0.1
