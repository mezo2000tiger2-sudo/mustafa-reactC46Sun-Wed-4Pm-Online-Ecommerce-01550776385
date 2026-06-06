# Design screen mockups (Stitch substitute)

Google’s **Stitch MCP** (`user-stitch`) is **not running successfully** in Cursor for this project—the agent only sees `SERVER_METADATA.json` and a `STATUS.md` that says *The MCP server errored*, with **no exported tool schemas** to call.

**Fix Stitch:** open **Cursor → Settings → MCP**, check `stitch` / `user-stitch` logs, fix auth or the server command, then reload. When tools appear, you can ask again for native Stitch renders.

These files are **static HTML/CSS previews** of every **non-auth** route, styled with the same direction as `.agents/skills/frontend-design`: editorial, warm paper, distinctive type (Fraunces + IBM Plex Sans), grain and soft color blooms—**not** generic purple-gradient UI.

## View the screens

Open in your browser:

`design-mockups/gallery.html`

**Checkout:** the **#checkout** screen shows the proposed layout only (saved addresses, optional manual fields, receipt + product thumbnails). The **Next.js checkout route is unchanged** until you approve and ask for it to be implemented in code.

Use the table of contents at the top to jump to each screen.

**Full gap analysis:** see [`AUDIT.md`](./AUDIT.md) — real app vs preview (missing features, design-only additions, API field notes).

## After Stitch works

Re-run your prompt; once `user-stitch` is healthy and exposes tools to Cursor, the agent can generate official Stitch outputs instead of this gallery.
