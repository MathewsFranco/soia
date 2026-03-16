---
description: Fetch tasks from your task management tool, rank them, and start working
disable-model-invocation: true
---

# /work — Daily Task Execution

Fetch tasks from your connected task management tool, rank them, and route to the right skill.

**Configured tools:** Notion, GitHub Issues

---

## Workflow

1. **Fetch tasks** — Query your task management tool via MCP for active/in-progress tasks assigned to the user
2. **Rank** — Sort by deadline urgency, then priority, then recent activity
3. **Present** — Show top 5-7 tasks in a numbered list with status, deadline, and summary
4. **Select** — User picks a task number (or use `/work next` for highest-priority, `/work [keyword]` to filter)
5. **Route** — Match the task to the best available skill and start working
6. **Document** — After completing work, update the task in the tool with a summary of what was done

## Usage

- `/work` — show top tasks, pick one
- `/work next` — start highest-priority task immediately
- `/work 3` — start task #3 from the list
- `/work [keyword]` — filter tasks by keyword

## Fallback

If no MCP connection is available:
1. Ask the user to paste their current task list
2. Or suggest running `/hatch` to set up the MCP integration
3. Work with whatever task information is provided