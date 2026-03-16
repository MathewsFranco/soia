# AGENTS.md

## Build Commands

- `npm run dev` - Start dev server on port 3000
- `npm run build` - Build and typecheck production bundle
- `npm run serve` - Preview production build
- `npm run test` - Run all tests with Vitest
- `vitest run <pattern>` - Run tests matching file pattern (eg. `vitest run ContactForm`)
- `npm run lint` - Run ESLint
- `npm run format` - Run Prettier
- `npm run check` - Format and lint all files

## Code Style Guidelines

### Imports & Formatting

- Absolute imports with `@/` alias, external libs first, then internal modules
- Use `.ts`/`.tsx` extensions explicitly, ES module syntax
- Single quotes, no semicolons, trailing commas, 80 char max width

### TypeScript

- Strict mode only - never use `any`
- Explicit types for parameters and returns
- Interfaces for object shapes, type aliases for unions
- Export types from dedicated `types.ts` files

```tsx
type NavLink = { href: string; label: string }
interface Web3FormsResponse {
  success: boolean
  message?: string
}
```

### Naming Conventions

- Components: PascalCase, Functions: camelCase, Constants: UPPER_SNAKE_CASE
- Hooks: `useXxx` pattern
- Files: PascalCase for components, kebab-case for utilities

### Components (React 19)

- Function declarations only
- Export default for main, named for helpers
- Define sub-components below main
- A11y: semantic HTML, aria-labels on interactive elements

```tsx
export default function Header() { ... }
const Square = ({ className }: { className?: string }) => (
  <div className={`w-25 h-25 bg-sage ${className}`} />
)
```

### Form Handling

- Use @tanstack/react-form
- Validate on change, return `undefined` for valid, string error for invalid
- Keep validators in `utils/validators.ts`
- Use Zod for schema validation when complex validation is needed

```tsx
export const validateEmail = ({ value }: { value: string }) => {
  if (!value?.trim()) return 'Email é obrigatório'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value) ? undefined : 'Email inválido'
}
```

### Error Handling & Async

- Try/catch/finally for async operations
- Return boolean success indicators
- Native fetch only, prefer AbortController for cancellation

```tsx
try {
  const response = await fetch(endpoint, { method: 'POST', body: data })
  const result = await response.json()
  if (result.success) {
    setSubmitResult(MESSAGES.success)
    return true
  }
} catch (error) {
  setSubmitResult(MESSAGES.networkError)
  return false
} finally {
  setIsSubmitting(false)
}
```

### Hooks

- Custom hooks for stateful logic
- Return state and handlers together
- Single responsibility per hook

```tsx
export function useContactForm() {
  const [submitResult, setSubmitResult] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  return { submitResult, isSubmitting, submitForm, setSubmitResult }
}
```

### Routing (@tanstack/react-router)

- File-based routing with `createFileRoute`
- Link component for navigation
- Handle hash links for smooth scrolling

```tsx
export const Route = createFileRoute('/')({ component: App })
```

### Styling (Tailwind CSS v4)

- Define custom colors in `@theme` block (styles.css)
- Semantic colors: crimson, sage, success, error
- `md:` breakpoints for responsive

### Performance

- GSAP for animations, cleanup on unmount
- Lazy load routes with file-based code splitting
- Optimize images in public/
- Vercel Analytics/Speed Insights for monitoring

### File Organization

- `src/components/` - UI components, utils/ subfolder for logic
- `src/routes/` - File-based routes
- `src/styles.css` - Global styles, Tailwind theme
- `public/` - Static assets

### Testing

- Vitest with jsdom environment (configured in vite.config.ts)
- Run with `vitest run` for all tests, `vitest run <pattern>` for specific files
- Note: No tests currently exist in this codebase

### Deployment

- GitHub Pages deployment configured (homepage in package.json)
- Build outputs to `dist/` directory

### General Rules

- No comments unless critical for complex logic
- No unused locals/parameters
- Small, focused components
- Separate: types, constants, validators, utils
- Never commit secrets (WARNING: Web3Forms access key is exposed in constants.ts - do NOT add more secrets)
- Do NOT run `npm run build` after every change - builds will be handled in separate phase
- Custom fonts loaded from public/fonts/ (Extenda-40-Hecto.ttf)
- Tailwind v4 with custom colors defined in @theme block (crimson, sage, success, error)
