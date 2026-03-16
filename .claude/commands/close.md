---
description: End-of-session review — capture learnings and update the workspace
---

# /close — Session Close

End the session by capturing what happened and feeding it back into the workspace.

## Step 1: Session Summary

Briefly summarize:
- What we worked on
- What was completed
- What's still in progress or unresolved

## Step 2: Workspace Feedback

Ask the user:

1. **"Did I get anything wrong?"** — Misunderstandings, incorrect assumptions, wrong approaches. Anything Claude should handle differently.
2. **"Anything I should remember for next time?"** — Preferences, patterns, context that would help future sessions start faster.
3. **"Any instructions to add or change?"** — Rules, conventions, or behaviors to encode in the workspace.

The user can answer any, all, or none. Don't force it — even a quick "all good" is fine.

## Step 3: Apply Updates

Based on the feedback, update the workspace:

- **CLAUDE.md** — Add or revise instructions, conventions, or project context
- **context/ files** — Update with new information, priorities, or decisions made
- **.claude/rules/** — Add new behavioral rules if the user described recurring preferences
- **CLAUDE.local.md** — For personal preferences that shouldn't be committed

Show the user exactly what you're changing before writing. Don't update silently.

## Step 4: Confirm

End with a short confirmation of what was updated (if anything) and any open items for next session.

Keep it lightweight. The goal is a 30-second habit, not a 10-minute review.