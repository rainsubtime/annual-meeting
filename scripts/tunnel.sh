#!/usr/bin/env bash
# 内网穿透：将本机 3000 端口暴露到公网
# 使用 localtunnel，无需安装与注册
# 用法：先运行 pnpm dev，再在另一终端执行 ./scripts/tunnel.sh 或 bash scripts/tunnel.sh

set -e
PORT="${1:-3000}"
echo "Tunneling port $PORT (ensure Next.js is running on that port)..."
exec npx localtunnel --port "$PORT"
