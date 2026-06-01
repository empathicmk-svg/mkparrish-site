# Publishing to Substack automatically (substack-mcp)

This connects Claude Code directly to your Substack using the
[substack-mcp](https://github.com/arthurcolle/substack-mcp) server, so the drafts in
this folder can be created (and published) without copy-pasting.

## How it works

The server exposes tools Claude can call: `substack_create_draft`,
`substack_update_draft`, `substack_publish`, `substack_post_note`,
`substack_get_drafts`, `substack_add_image`, and more. It talks to Substack's
internal API using **your session cookie** (`substack.sid`) — Substack has no
official API, so this is the only way in.

## One-time setup

```bash
bash scripts/setup-substack-mcp.sh
```

This clones the server, installs it in an isolated venv, writes a `~/.substackrc`
template (publication pre-filled to `mkparrishthemargins.substack.com`), and registers it
with Claude Code.

### Then — two steps only you can do

1. **Add your cookie.** Open `mkparrishthemargins.substack.com` in your browser →
   DevTools (F12) → Application → Cookies → copy the value of `substack.sid`.
   Paste it into `~/.substackrc` in place of the placeholder.
   *(The cookie grants full access to post as you — keep it private; `~/.substackrc`
   is created with `600` permissions and is never committed.)*
2. **Restart Claude Code.** MCP servers load at startup, so the `mcp__substack__*`
   tools only appear in a fresh session.

## Then ask Claude to publish

Once the tools are live, ask: **"create the Substack drafts."** Claude will, for each
file in `content/substack/`:

| File | `substack_create_draft` audience |
| --- | --- |
| `01-what-ai-cant-write-for-you.md` | `everyone` (free) |
| `02-the-conversion-math-founders-avoid.md` | `only_paid` |
| `03-the-rewrite.md` | `everyone` (free) |
| `04-quotes-that-refuse-to-be-quiet.md` | `everyone` (free) |

It creates **drafts** (not live posts) so you can review formatting in Substack
first. Say the word and it will `substack_publish` them — with `send_email` off by
default so you control the email blast.

> Branding (rename "mags" → The Margins, logo/cover, colors) is still done in
> Substack's settings — see `BRANDING.md`. The MCP server handles posts, not
> publication-level theme settings.
