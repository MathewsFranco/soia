# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## Session Start

At the start of every session, run `/prime`.

---

## Project

**Soia** — SOIA website. React 19 frontend for a brand and marketing agency focused on culture, behavior, and branding. Black-first, editorial design with GSAP scroll animations.

**Type:** frontend
**Stack:** React 19, Vite, TypeScript, Tailwind CSS 4, TanStack Router, GSAP
**Task Management:** GitHub Issues
**Repo:** `MathewsFranco/soia`

---

## Build Commands

- `npm run dev` — Start dev server on port 3000
- `npm run build` — Build and typecheck production bundle
- `npm run serve` — Preview production build
- `npm run test` — Run all tests with Vitest
- `vitest run <pattern>` — Run tests matching file pattern
- `npm run lint` — Run ESLint
- `npm run format` — Run Prettier
- `npm run check` — Format and lint all files

**Do NOT run `npm run build` after every change** — builds are handled in a separate phase.

---

## Code Style

### Imports & Formatting

- Absolute imports with `@/` alias, external libs first, then internal
- Single quotes, no semicolons, trailing commas, 80 char max width

### TypeScript

- Strict mode — never use `any`
- Explicit types for parameters and returns
- Interfaces for object shapes, type aliases for unions

### Naming

- Components: PascalCase, Functions: camelCase, Constants: UPPER_SNAKE_CASE
- Hooks: `useXxx` pattern
- Files: PascalCase for components, kebab-case for utilities

### Components (React 19)

- Function declarations only
- Export default for main component, named exports for helpers
- A11y: semantic HTML, aria-labels on interactive elements

### Form Handling

- Use `@tanstack/react-form`
- Validate on change: return `undefined` for valid, string error for invalid
- Keep validators in `utils/validators.ts`

### Error Handling

- Try/catch/finally for async operations
- Native fetch only, prefer AbortController for cancellation

### Routing

- `@tanstack/react-router` with file-based routing
- `Link` component for navigation, hash links for smooth scroll

### Styling (Tailwind CSS 4)

- Custom colors defined in `@theme` block in `styles.css`
- Current palette: wine (`#5D2A2D`), taupe (`#686058`)
- `md:` breakpoints for responsive layout

### Animations

- GSAP for all animations — register plugins once, clean up on unmount
- ScrollSmoother wraps the entire page (`#smooth-wrapper` / `#smooth-content`)
- Respect `prefers-reduced-motion`
- Animation presets live in `src/utils/motion.ts` as the `MOTION` object — use these instead of inline values

### General Rules

- No comments unless critical for complex logic
- No unused locals or parameters
- Small, focused components
- Never commit secrets

---

## Project Structure

```
src/
├── components/
│   ├── Hero.tsx
│   ├── Pillars.tsx
│   ├── About.tsx
│   ├── Services.tsx
│   ├── Marquee.tsx
│   ├── Founder.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── ContactForm/
│   └── ui/
│       ├── SectionLabel.tsx
│       └── SectionDivider.tsx
├── routes/
│   ├── __root.tsx       ← ScrollSmoother, SEO meta
│   ├── index.tsx        ← all sections + GSAP orchestration
│   └── about.tsx
├── utils/
│   └── motion.ts        ← MOTION animation presets
└── styles.css           ← Tailwind theme, font tokens, keyframes
public/
├── new-logos/           ← logo variants (-05, -08, -15, -16, -17, -20 in use)
├── fonts/               ← Roswell, Open Sauce One
└── founder.jpeg
```

---

## Commands

| Command | Purpose |
|---------|---------|
| `/prime` | Initialize session with full context awareness |
| `/create-plan` | Create an implementation plan before making changes |
| `/implement` | Execute a plan step by step |
| `/work` | Fetch tasks from GitHub Issues, rank them, start working |
| `/review` | Review code for quality, security, and best practices |
| `/draft` | Quick-draft content |
| `/research` | Research a topic and produce a structured summary |
| `/close` | End-of-session review: capture learnings and update the workspace |

---

## Agents

| Agent | Description | Tools | Model |
|-------|-------------|-------|-------|
| Code Reviewer | Reviews code for bugs, performance, and best practices | Read, Grep, Glob | default |
| Content Editor | Reviews and improves content for clarity, voice, and impact | Read, Write, Edit, Glob | default |
| Design Auditor | Audits UI code for design consistency, accessibility, and UX patterns | Read, Grep, Glob | haiku |
| API Designer | Designs REST and GraphQL APIs with schemas, endpoints, and docs | Read, Write, Grep, Glob, WebSearch | default |

---

## Skills

| Skill | Description |
|-------|-------------|
| Code Reviewer | Review code for bugs, performance, and best practices |
| Documentation Writer | Generate clear documentation for code and APIs |
| Project Manager | Plan, track, and manage projects and tasks |
| Frontend Designer | Build polished UIs with React and Tailwind CSS |
| Accessibility Auditor | Audit and fix web accessibility issues (WCAG) |
| User Researcher | Design and analyze user research studies |
| Page CRO | Audit and optimize web pages for conversion rate |
| Skill Creator | Create new Claude Code skills |

---

## Rules

Loaded automatically from `.claude/rules/`:

- **Code Style** — `.claude/rules/code-style.md`
- **Brand Voice** — `.claude/rules/brand-voice.md`
- **Context Management** — `.claude/rules/context-management.md`
- **Documentation** — `.claude/rules/documentation.md`

---

## Frontend Aesthetics

Avoid generic "AI slop" aesthetics. Make creative, distinctive frontends that surprise and delight.

- **Typography:** Choose beautiful, unique fonts. Avoid generic fonts like Arial, Inter, Roboto, system fonts. Opt for distinctive choices that elevate aesthetics. Avoid converging on common choices (e.g. Space Grotesk) across generations.
- **Color & Theme:** Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration. Avoid cliched color schemes (particularly purple gradients on white backgrounds).
- **Motion:** Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use GSAP for React (project standard). Focus on high-impact moments: one well-orchestrated page load with staggered reveals (`animation-delay`) creates more delight than scattered micro-interactions.
- **Backgrounds:** Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.
- **Layouts:** Avoid predictable layouts and cookie-cutter component patterns. Make unexpected choices that feel genuinely designed for the context.
- **Variety:** Vary between light and dark themes, different fonts, different aesthetics. Think outside the box — never settle for the first obvious choice.

---

## Design Reference

See `soia-design` workspace for the full redesign plan (`plans/website-redesign.md`) and design system (`outputs/design-system.md`).

**Design direction:** Black-first editorial. Roswell for headlines, Open Sauce One for labels, Poppins Light for body. Wine (`#5D2A2D`) as accent only — never background. No rounded containers, no drop shadows.

---

## Critical Instruction: Maintain This File

After any change — adding commands, modifying structure, discovering conventions — ask:

1. Does this change add new functionality to document?
2. Does it modify the structure described above?
3. Should a command or agent be listed?

If yes to any, update the relevant section.
