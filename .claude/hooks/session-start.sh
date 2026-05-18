#!/bin/bash
# SessionStart hook — installs npm dependencies so tests, linters,
# and the Next.js build work in Claude Code on the web sessions.
set -euo pipefail

# Only run in the remote (web) environment. Local sessions already have
# whatever the developer has set up.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

echo "[session-start] Installing npm dependencies..."
npm install --no-audit --no-fund --prefer-offline

echo "[session-start] Done."
