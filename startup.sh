#!/bin/bash

set -euo pipefail

# Check for .env file
test -f .env || (echo "$(date +'%Y-%m-%d %H:%M:%S') ERROR: .env file not found" >&2; exit 1)

# Source .env file
if ! source .env; then
  echo "$(date +'%Y-%m-%d %H:%M:%S') ERROR: Failed to source .env file" >&2
  exit 1
fi

# Check required environment variables
DATABASE_URL="${DATABASE_URL:?DATABASE_URL not set}"
JWT_SECRET="${JWT_SECRET:?JWT_SECRET not set}"
PORT="${PORT:-3001}"

# Start backend server
echo "$(date +'%Y-%m-%d %H:%M:%S') Starting backend server..."
npm run start &
backend_pid=$!

# Wait for backend server to start and check health
wait_for_service http://localhost:${PORT}/api

# Check backend server status
if [[ $? -ne 0 ]]; then
  echo "$(date +'%Y-%m-%d %H:%M:%S') ERROR: Backend server failed to start" >&2
  exit 1
fi

echo "$(date +'%Y-%m-%d %H:%M:%S') Backend server started successfully at http://localhost:${PORT}/api"


# Trap signals for cleanup
trap cleanup EXIT ERR

#Function definitions

wait_for_service() {
  local url="$1"
  local timeout=30
  local interval=1

  until curl --fail --silent "$url"; do
    sleep "$interval"
    timeout=$((timeout - interval))
    if [[ $timeout -le 0 ]]; then
      echo "$(date +'%Y-%m-%d %H:%M:%S') ERROR: Timeout waiting for service: $url" >&2
      return 1
    fi
  done

  return 0
}

cleanup() {
  echo "$(date +'%Y-%m-%d %H:%M:%S') Cleaning up..."
  kill -TERM "$backend_pid" 2>/dev/null || true
}

```