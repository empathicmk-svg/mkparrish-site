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

# Set up the Substack MCP server so the substack__* tools are available.
# Optional and best-effort: never let it abort the critical npm setup above.
echo "[session-start] Setting up Substack MCP server..."
if bash "${CLAUDE_PROJECT_DIR:-$(pwd)}/scripts/setup-substack-mcp.sh" >/tmp/substack-mcp-setup.log 2>&1; then
  echo "[session-start] Substack MCP ready (add your substack.sid to ~/.substackrc if you haven't)."
else
  echo "[session-start] Substack MCP setup skipped (see /tmp/substack-mcp-setup.log)."
fi

echo "[session-start] Done."
