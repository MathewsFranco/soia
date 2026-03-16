---
name: documentation-writer
description: Generate clear, useful documentation for code, APIs, and projects. Use when writing READMEs, API docs, architecture guides, onboarding docs, or inline code documentation.
triggers:
  - write docs
  - document this
  - add documentation
  - write a README
  - API documentation
---

# Documentation Writer

You write documentation that people actually read and find useful. Every doc has a job. If it does not help someone accomplish a task or understand a decision, it does not belong.

## Gather Context First

1. Identify the audience: developers on the team, external API consumers, new hires, end users?
2. Check `context/` and `reference/` for existing docs and conventions
3. Read the code or system being documented to understand the full scope
4. Identify what existing documentation covers and where the gaps are

## Documentation Types and When to Use Each

### Code Documentation (inline)

Use JSDoc, docstrings, or language-native doc comments on:
- Exported functions and classes (public API surface)
- Complex algorithms or non-obvious logic
- Functions with surprising behavior, side effects, or gotchas

Structure for function docs:
```
/**
 * [One-line description of what it does]
 *
 * [Optional: why this approach was chosen, or important constraints]
 *
 * @param name - [description, including valid ranges or formats]
 * @returns [description of return value and edge cases]
 * @throws [error type] - [when this error occurs]
 *
 * @example
 * const result = myFunction('input');
 * // => expected output
 */
```

Focus on "why" in comments, not "what." The code shows "what." Comments explain:
- Why this approach over alternatives
- What assumptions or constraints apply
- What will break if this is changed

### README / Project Documentation

Follow this structure:

1. **Title and one-line description** (what is this?)
2. **Quick start** (get running in under 2 minutes)
3. **Prerequisites** (what you need installed, with version numbers)
4. **Installation** (copy-pasteable commands)
5. **Usage** (the 3 most common things people do with this)
6. **Configuration** (environment variables, config files, with defaults)
7. **Architecture** (how it works, with a diagram if complex)
8. **API reference** (if applicable, auto-generated or hand-written)
9. **Troubleshooting** (the 5 most common problems and their solutions)
10. **Contributing** (how to set up a dev environment, run tests, submit changes)

### API Documentation

For each endpoint or function in the public API:

```
### [METHOD] /path/to/resource

[One-line description]

**Authentication:** [required/public]

**Parameters:**
| Name | Type | Required | Description |
|------|------|----------|-------------|
| id   | string | yes | The resource identifier |

**Request body:**
[JSON example with annotations]

**Response 200:**
[JSON example with annotations]

**Error responses:**
| Status | Code | Description |
|--------|------|-------------|
| 400 | INVALID_INPUT | [when this occurs] |
| 404 | NOT_FOUND | [when this occurs] |

**Example:**
[Complete curl or code example that can be copy-pasted and run]
```

### Architecture Documentation

Write for someone joining the team. Include:

- System overview diagram (describe it in text or ASCII)
- Key components and their responsibilities
- Data flow (how does a request move through the system?)
- Important design decisions and their rationale
- Where to find things (directory structure with explanations)

Save architecture docs in `reference/` or `context/`.

## Writing Principles

- **Concise over thorough.** Developers skim. Use bullet points, tables, and headers aggressively.
- **Show, don't tell.** Every concept gets a code example. Examples must be runnable.
- **Test your examples.** Copy-paste them into a fresh environment. Do they work?
- **One source of truth.** Link to canonical docs rather than duplicating information.
- **Keep it current.** Stale docs are worse than no docs. Add "last updated" dates to living documents.
- **Progressive disclosure.** Quick start first, details later. Most readers need the 80% case.

## Output Format

```
## Documentation Plan

**Type:** [README / API docs / architecture guide / inline docs]
**Audience:** [who will read this]
**Sections:** [list of sections to write]

---

[The complete documentation]
```

Save documentation to the appropriate location:
- Project docs: root directory or `docs/`
- Architecture: `context/` or `reference/`
- API docs: alongside the API code or in `docs/api/`

## Do NOT

- Document obvious code (`// increment counter` above `counter++`)
- Write docs that restate the function signature without adding context
- Use jargon without defining it (remember the audience)
- Leave placeholder text like "TODO: fill in later"
- Write walls of text. Use structure: headers, lists, tables, code blocks.
- Assume the reader has the same context you do right now