---
description: First-run command. Scan your workspace and rewrite templates with real details.
---

# /hatch — First-Run Workspace Setup

This command scans the current directory and rewrites all generated template files to be workspace-specific.

Read `.froject.json` first. Use the frog's name in status messages (e.g. "{{frogName}} is scanning your workspace...").

**Important:** Many users have never used a terminal before. Use plain, friendly language. Never assume they know what git, npm, or package managers are. If something fails, explain what happened and what to do next. Don't just show an error.

---

## Phase 1: Pre-flight

1. Read `.froject.json` to load frog identity, workspace type, and check `hatched` status
2. If `hatched` is already `true`, warn the user: "This workspace was already hatched. Running again will overwrite customizations. Continue?" Wait for confirmation.
3. Announce: "**{{frogName}} is hatching your workspace.** *{{frogTagline}}*"

## Phase 2: Connect MCP Tools

If `.froject.json` contains an `mcpIntegrations` array with entries, try to connect them now.

**CRITICAL: You must actually run the install commands below. Do NOT just describe what you would do. Execute the command, wait for the result, and verify it worked.**

1. **List planned connections:** "{{frogName}} is connecting your tools: [Notion, Slack, GitHub, ...]"
2. **For each integration**, read its `mcpInstall` command and `mcpStatus`:

   **Official servers** (mcpStatus: "official"):
   a. Tell the user: "Connecting [tool name]..."
   b. Run the `mcpInstall` command using the Bash tool. For example: `claude mcp add --transport http notion https://mcp.notion.com/mcp`
   c. If the command opens a browser for OAuth, tell the user: "A browser window should have opened. Complete the sign-in there, then come back here."
   d. Wait for the user to confirm they completed the auth flow.
   e. Test the connection by making a simple read call with the new MCP tool. If it returns data, the connection works.
   f. Report result: "Connected [tool name]" or "Connection failed. You can retry later with: `[mcpInstall command]`"

   **Community servers** (mcpStatus: "community"):
   a. Tell the user: "This is a community-maintained server. It may need an API key or extra setup."
   b. Show the exact command and ask: "Want me to run this now?"
   c. If it needs an API key, explain where to get one and wait for the user to provide it.

3. **Connect one tool at a time.** Finish one connection before starting the next.
4. **If a connection fails**, explain what went wrong, give the retry command, and move on.
5. **After all connections**, summarize: "Connected: [list]. Failed: [list]."
6. **Skip option** — If the user says "skip" or "later", move on.
7. **No integrations?** Skip this phase silently.

**Important: MCP connections often require restarting Claude Code to take effect.** If tools were connected but aren't responding yet, note this in Phase 4 and let the user know enrichment will happen on their next session (see Phase 6).

## Phase 3: Scan

Check the workspace type from `.froject.json`. Adapt scanning to what's actually present.

**For all workspace types:**
- **Directory structure**: List top-level folders and files
- **Git**: Check if `.git/` exists (don't worry if it doesn't, many workspaces start without git)
- **Workspace files**: Read any content already in context/, knowledge/, playbooks/, or other workspace directories
- **Connected tools**: For each successfully connected MCP, pull a sample of data (recent tasks, channel list, recent docs). This feeds into Phase 5.

**For software / data-science / operations types only:**
- **Package manifests**: `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `Gemfile`, `pom.xml`, `build.gradle`
- **Config files**: `.eslintrc`, `prettier`, `tsconfig.json`, `.editorconfig`, CI configs
- **Scripts**: `Makefile`, `Justfile`, npm scripts, shell scripts
- **Frameworks**: detect React, Next.js, Django, FastAPI, Rails, Spring, etc.

**For non-code workspace types** (marketing, sales, product, people-culture, research, design, general):
- Do NOT look for package.json, node_modules, or run any package manager commands
- Do NOT report "no code project found" as if something is wrong. This is expected.
- Focus on: workspace name, user role, tools listed, and directory contents

## Phase 4: Report

Present a discovery summary to the user:

```
{{frogName}} found:
- Workspace: [name] ([type])
- Role: [user role if set]
- Tools: [listed tools]
- Connected: [list of successfully connected MCPs, or "none"]
- Directories: [list of workspace directories with content status]
```

For software workspaces, also include: Languages, Framework, Tests, Linter, Build, CI, Git.

Ask: "Does this look right? Anything to correct or add?"

Wait for user response before continuing.

## Phase 5: Ask

Ask **at most 2-3 questions** about genuine gaps, things the scan and MCP data couldn't determine. Keep questions simple and jargon-free. Bias toward fewer questions — if you have enough to work with, skip this phase entirely.

Possible questions (only ask what's truly missing):
- What is this workspace for? (only if the description is empty or vague)
- Any key context to seed into knowledge files? (company, team, domain specifics)
- Anything Claude should know about how you work?

**Do not ask about:** the user's role (it's in the config), how they'll use Claude (infer from workspace type), or tools (already configured). If the user responds with "all good" or similar, move on immediately.

## Phase 6: Rewrite + Auto-Enrich

Using scan results + user answers, rewrite all generated template files:

### CLAUDE.md
- Replace placeholder workspace name/description with real values
- For software types: fill in languages, tools, frameworks from scan
- For non-code types: focus on role, tools, and workflow context
- Update workspace structure tree to reflect actual directories
- Keep the frog identity line
- **Rewrite the "Session Start" section** to just: "At the start of every session, run `/prime`." (remove the .froject.json check, it's no longer needed after hatching)

### Workspace directory files (context/, knowledge/, etc.)
- Fill files with user-provided context from the conversation
- Remove empty files that the user didn't provide content for
- Remove empty directories that serve no purpose. Don't leave empty scaffolding.

### .claude/commands/
- Update `/prime` content to reference real workspace details
- Keep all other commands, adjusting descriptions if workspace type changed

### .claude/settings.json
- For software workspaces: update permissions based on project needs
- For non-code workspaces: ensure no code-specific hooks are enabled (no npm test, no eslint, no tsc)

### Skills
- Enable/disable skills based on workspace type and user role

### Auto-enrich from connected MCPs (if available)

**Check if any MCP tools are actually responding.** If tools were connected in Phase 2 but aren't responding yet (common after fresh MCP installs that need a Claude restart), skip enrichment and set `hatched` to `"partial"` in Phase 8 instead of `true`. The /prime command will automatically complete enrichment on the next session when the tools are active.

**If MCP tools ARE responding**, enrich now:

For each connected MCP, use `contextType` and `contextTargets` from `.froject.json` to pull real data into workspace files:

| contextType | What to pull | Target files |
|-------------|-------------|--------------|
| tasks | Current sprint/board items, priorities, milestones | roadmap.md |
| communication | Team channels, recent discussions, team norms | team.md, conventions.md |
| docs | Key documents, wiki pages, knowledge base entries | business-info.md, strategy.md |
| code | Repo structure, conventions, recent PRs, CI config | conventions.md, architecture.md |
| data | Schema overview, key tables/collections | architecture.md |
| design | Design tokens, component inventory, style guidelines | design-system.md |
| infrastructure | Services, deployments, monitoring setup | infrastructure.md |
| crm | Pipeline stages, key accounts, recent activity | current-data.md, business-info.md |

**How to enrich:**
1. For each connected MCP, query for relevant data using the MCP tools available
2. Summarize the data into the target context files. Don't dump raw data, write useful summaries.
3. If a target file already has user-provided content, append MCP data below a "--- Auto-enriched from [tool] ---" divider
4. If a target file doesn't exist in the workspace, skip it

## Phase 7: Quick-launch alias

Set up a shell alias so the user can open this workspace by typing a single word in any terminal.

1. Ask: "What word do you want to type to open this workspace? (e.g. `marketing`, `work`, `myproject`)"
2. Detect the user's shell config file:
   - If `$SHELL` contains "zsh" → `~/.zshrc`
   - If `$SHELL` contains "bash" → `~/.bashrc`
   - Otherwise → ask the user
3. **Get the absolute path** to the current workspace by running `pwd`. Store the result as the workspace path. Do NOT use a placeholder or relative path.
4. Append this line to the shell config file (using the **actual absolute path** from step 3):

```bash
alias {{alias_name}}="cd /absolute/path/to/workspace && claude"
```

For example, if `pwd` returns `/Users/bjorn/Downloads/my-marketing-workspace`, the alias should be:
```bash
alias marketing="cd /Users/bjorn/Downloads/my-marketing-workspace && claude"
```

5. **Verify the alias** by reading back the line you just wrote to confirm the path is correct
6. Run `source ~/.zshrc` (or the appropriate config file) so it takes effect immediately
7. Tell the user: "Done! From now on, just type `{{alias_name}}` in any terminal to open this workspace."

## Phase 8: Finalize

1. **Determine hatch status.** If MCP enrichment happened successfully in Phase 6, set `hatched` to `true`. If enrichment was skipped (tools not responding or not connected), set `hatched` to `"partial"`.
2. Update `.froject.json`: set `hatched` to the appropriate value, update `project` fields with real data, update `generatedFiles` manifest.
3. **Verify CLAUDE.md**. Read the original and rewritten versions. Make sure no important sections were dropped (commands table, rules table, workspace structure, session workflow). If anything was lost, restore it.
4. Read back all modified files to verify consistency.
5. Present completion report:

**If fully hatched (hatched: true):**

```
{{frogName}} has hatched your workspace!

Modified files:
- CLAUDE.md (rewritten with your details)
- [workspace directories] (filled with context)
- [enriched files] (auto-populated from connected tools)
- .claude/commands/prime.md (updated)
- .froject.json (marked as hatched)

Your workspace is ready.
```

**If partially hatched (hatched: "partial"):**

```
{{frogName}} has set up your workspace structure!

Modified files:
- CLAUDE.md (rewritten with your details)
- [workspace directories] (filled with what we know so far)
- .claude/commands/prime.md (updated)
- .froject.json (marked as partial)

One more step: Your tools (Notion, Slack, etc.) need a restart to
finish connecting. Close this session, reopen the workspace, and
/prime will automatically pull in your data from connected tools.

This is normal. Tool connections take effect after a restart.
```

6. After the file list, suggest what to do next:

**If fully hatched:**
```
You're all set! Your workspace is hatched and ready to go.

Here's what you can do right now:
- /work — Start your first task (fetches tasks if you have a task manager connected)
- /create-plan — Plan out a piece of work before diving in
- Or just ask Claude anything — it has your full context loaded.

Next time you want to open this workspace, just type: {{alias_name}}

At the end of each session, run /close to capture what worked and
what Claude should do differently next time.
```

**If partially hatched:**
```
Next steps:
1. Close this session: type /exit
2. Open the workspace again: type {{alias_name}}
3. /prime will detect your connected tools and pull in real data

After that, you're fully set up. The workspace gets better every
time you use it and give feedback.
```

7. Replace all `{{...}}` placeholders with actual values at runtime.

---

**Important:** Replace `{{frogName}}` and `{{frogTagline}}` with the actual values from `.froject.json` at runtime.