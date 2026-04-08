---
description: Standards for code documentation, README files, and technical writing
---

# Documentation Rules

- Every public function/method must have a docstring explaining purpose, parameters, and return value
- README must include: what this is, how to set up, how to run, how to test, how to deploy
- Keep documentation next to the code it describes — prefer inline docs over separate wikis
- Update documentation in the same PR as the code change
- Use code examples that actually run — never include untested snippets in docs
- Document "why" decisions in ADRs (Architecture Decision Records) for significant choices
- Keep changelogs updated for libraries and APIs
- Delete stale documentation — wrong docs are worse than no docs

**Documentation hierarchy:**
1. Self-documenting code (clear naming, simple structure)
2. Code comments for "why" (not "what")
3. README for getting started
4. ADRs for architectural decisions
5. API docs for consumers
6. Runbooks for operations