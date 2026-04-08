---
description: Enforce consistent code style across the project
---

# Code Style Rules

- Follow the project's established coding patterns and conventions
- Use consistent naming: camelCase for variables/functions, PascalCase for classes/components
- Keep functions under 30 lines — if longer, extract helper functions
- Prefer explicit return types over inferred types
- Use early returns to reduce nesting — max 3 levels of indentation
- Avoid abbreviations in variable names — clarity over brevity (`getUserById` not `getUsrById`)
- Maximum line length: 100 characters
- Group related imports together with blank lines between groups
- Delete dead code — don't comment it out

**Examples of violations:**
- `const d = new Date()` → `const createdAt = new Date()`
- Deeply nested if/else → use guard clauses with early returns
- 80-line function → extract 3-4 focused functions