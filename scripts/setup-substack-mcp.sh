#!/usr/bin/env bash
# Sets up the substack-mcp server (https://github.com/arthurcolle/substack-mcp)
# so Claude Code can create/update/publish Substack drafts for "The Margins".
#
# Run once per environment:  bash scripts/setup-substack-mcp.sh
# Then: add your cookie to ~/.substackrc and RESTART Claude Code.
set -euo pipefail

REPO_DIR="${SUBSTACK_MCP_DIR:-$HOME/substack-mcp}"
PUBLICATION="mkparrishthemargins.substack.com"

echo "▶ Cloning substack-mcp into $REPO_DIR"
if [ ! -d "$REPO_DIR/.git" ]; then
  git clone --depth 1 https://github.com/arthurcolle/substack-mcp.git "$REPO_DIR"
else
  git -C "$REPO_DIR" pull --ff-only || true
fi

echo "▶ Installing dependencies in an isolated venv"
python3 -m venv "$REPO_DIR/.venv"
"$REPO_DIR/.venv/bin/pip" install -q --upgrade pip
"$REPO_DIR/.venv/bin/pip" install -q -r "$REPO_DIR/requirements.txt"

echo "▶ Writing credentials template to ~/.substackrc (if missing)"
if [ ! -f "$HOME/.substackrc" ]; then
  cat > "$HOME/.substackrc" <<EOF
# Substack credentials for substack-mcp.
# Get the cookie: open https://$PUBLICATION in Chrome/Safari -> DevTools (F12)
# -> Application -> Cookies -> $PUBLICATION -> copy the value of "substack.sid".
export SUBSTACK_PUBLICATION="$PUBLICATION"
export SUBSTACK_SID="REPLACE_WITH_YOUR_substack.sid_VALUE"
EOF
  chmod 600 "$HOME/.substackrc"
fi

echo "▶ Registering MCP server with Claude Code (user scope)"
claude mcp add substack --scope user -- \
  bash -c "source ~/.substackrc && $REPO_DIR/.venv/bin/python $REPO_DIR/substack_mcp/server.py" \
  2>/dev/null || echo "  (already registered — skipping)"

cat <<'DONE'

✅ Setup complete. Two steps left, only you can do them:
   1. Edit ~/.substackrc and paste your real substack.sid cookie value.
   2. Restart Claude Code so the `mcp__substack__*` tools load.

Then ask Claude to "create the Substack drafts" — it will turn the files in
content/substack/ into drafts (free/paid set per the README), for you to
review and publish from Substack.
DONE
