# /prime — Session Initialization

## Step 0: Check workspace status

Read `.froject.json` and check the `hatched` field:

- If `hatched` is `false`: Run `/hatch` automatically. Do not proceed until hatching is complete.
- If `hatched` is `"partial"`: The workspace structure is set up but context enrichment hasn't happened yet. Jump to **Step 2** below.
- If `hatched` is `true`: Proceed to **Step 1**.

## Step 1: Load context

Read CLAUDE.md and all workspace directory files. Then provide a brief summary:

1. **Who I am** — my name, role, and how I use Claude
2. **What we're working on** — the workspace, its type, and current state
3. **Key context** — any active priorities, conventions, or constraints
4. **Ready status** — confirm you're oriented and ready to help

Be concise. No need to list every file — just demonstrate understanding.

## Step 2: Complete enrichment (only when hatched is "partial")

This runs automatically when the workspace was hatched but enrichment was skipped because tools weren't connected yet.

1. **Check MCP connections.** Run `/mcp` or check which MCP tools are available.
2. **If tools are now connected** (Notion, Slack, HubSpot, etc.):
   - Tell the user: "Your tools are connected now. Let me pull in your data to finish setting up."
   - Pull data from each connected MCP into workspace context files (same as /hatch Phase 6 enrichment)
   - Update `.froject.json`: set `hatched` to `true`
   - Tell the user: "Enrichment complete. Your workspace now has real data from your tools."
3. **If tools are NOT connected yet:**
   - Tell the user: "I notice your workspace hasn't been enriched with data from your tools yet. Want to connect them now? Type `/mcp` to set up your integrations, then start a new session and I'll pull in your data automatically."
   - Do NOT block the session. Proceed to Step 1 so the user can still work.
4. After enrichment (or skipping), proceed to **Step 1** to load context normally.