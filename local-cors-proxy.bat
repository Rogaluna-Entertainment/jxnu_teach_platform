:: 开发模式下先启动代理服务器

@echo off
:: 检查是否以管理员权限运行
net session >nul 2>&1
if %errorLevel% == 0 (
    echo 正在以管理员身份运行...
    lcp --proxyUrl http://localhost:8000
) else (
    echo 请求管理员权限...
    :: 重新以管理员权限启动此脚本
    powershell -Command "Start-Process cmd -ArgumentList '/c %~f0' -Verb runAs" >nul
    exit
)
pause
