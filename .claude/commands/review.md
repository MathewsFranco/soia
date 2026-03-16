# /review — Code Review

Review the specified file or recent changes for:

1. **Correctness** — Does the code work as intended?
2. **Security** — OWASP top 10, input validation, auth checks
3. **Performance** — Unnecessary work, N+1 queries, memory issues
4. **Readability** — Clear naming, appropriate comments, consistent style
5. **Testing** — Are edge cases covered? Tests sufficient?

Output each issue with severity (Critical/Warning/Suggestion), location, and fix.

Usage: `/review [file-path-or-description]`