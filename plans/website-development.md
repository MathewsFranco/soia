# SOIA Website — Development Plan

> Created: 2026-03-13
> Repo: `MathewsFranco/soia` — `/Users/mathewsfranco/Developer/soia`
> Stack: React 19 · Vite · TypeScript · Tailwind CSS 4 · TanStack Router · GSAP

---

## Current State Assessment

The site is partially built (PR #2 — Soia 2.0 in progress). Core design system is solid. Several components exist but need work.

### What's working well
- Hero section (`Slogan.tsx`) — strong copy, good layout
- `About.tsx` — clean, on-brand
- `Services.tsx` — well-structured with hover animations
- `Footer.tsx` + `ContactForm/` — complete, floating label form
- `Header.tsx` + `LogoMorphSVG.tsx` — animated logo, responsive nav
- `AnimatedGradientBg.tsx` — interactive gradient background
- CSS design tokens — colors, fonts, animations all defined correctly

### Issues to fix
- `Founder.tsx` — uses stale `bg-sage` and `font-syne` (removed in Soia 2.0), not connected to any route
- `BrandDefinition.tsx` — same stale styles, orphaned component
- `/about` route — inline implementation, doesn't use shared components, inconsistent with main design system
- `Founder.tsx` references `/founder.jpeg` — exists ✓, but image is not positioned/styled to brand standard

### Missing
- SEO/meta tags (`<title>`, Open Graph, canonical URL)
- Founder section on home page (Fabiana's story)
- Work/case studies or social proof section
- Smooth scroll between sections on mobile
- Page transitions

---

## Page Architecture

```
/ (Home)
├── AnimatedGradientBg   ← full-page background layer
├── Header               ← sticky, transparent → solid on scroll
├── Hero                 ← "Menos ruído. Mais impacto." + logomark
├── Brand Pillars        ← OUSADA · CRIATIVA · EXCLUSIVA · CONTEMPORÂNEA
├── About                ← brand origin story
├── Services             ← 3-column: Estratégia, Marca, Marketing
├── Founder              ← Fabiana Tomaz, rebuilt on-brand
└── Footer               ← contact heading + form + bottom bar

/about (Quem Somos)
├── Header
├── Hero                 ← page-level header for the About page
├── Manifesto            ← brand philosophy paragraphs
├── Founder profile      ← reuse or reference Founder component
└── Footer
```

---

## Development Phases

### Phase 1 — Fix & Clean (Priority: high)
Get the existing codebase into a consistent, shippable state.

**1.1 — Remove stale components**
- Delete `BrandDefinition.tsx` — fully replaced by `About.tsx`
- Keep `Founder.tsx` — but rewrite it (Phase 2)

**1.2 — Rebuild `/about` route**
- Rebuild `src/routes/about.tsx` using the Soia 2.0 design tokens
- Use `font-roswell` for headings, `font-poppins` for body
- Match spacing/color pattern of `About.tsx` and `Services.tsx`
- Include: brand manifesto, Fabiana's bio, link back to home

**1.3 — SEO baseline**
- Add `<title>`, `<meta name="description">`, OG tags to `src/routes/__root.tsx`
- Use `/og-image.png` (already in public — ready to use)
- Add canonical URL for `mathewsfranco.github.io/soia`

---

### Phase 2 — Complete Sections (Priority: medium)
Add the pieces the home page is missing.

**2.1 — Rebuild Founder section**
- Strip `font-syne` and `bg-sage` — use `bg-black` with subtle wine accent
- Layout: photo left / text right (desktop), stacked (mobile)
- Use `/founder.jpeg` — crop to portrait, soft circular frame or editorial square
- Typography: Roswell heading, Poppins body
- Add to `src/routes/index.tsx` between Services and Footer

**2.2 — Social proof / work signal**
- Simple section: 1–2 lines + brand/client logos or category tags
- Alternative: a quote from Fabiana as a full-bleed editorial moment
- Keep it minimal — no fake case studies

**2.3 — Header scroll behavior**
- On scroll down: add `border-b border-white/10` and slight backdrop blur
- Currently the header is always `bg-black` with border — make it feel connected to the gradient background on scroll

---

### Phase 3 — Polish & Performance (Priority: low/ongoing)
Fine-tune the experience.

**3.1 — Animations**
- Review GSAP triggers — ensure they fire correctly on `/about` page too
- Add entrance animation to Founder section
- Consider a subtle parallax on the hero logomark

**3.2 — Mobile**
- Full audit of each section on 375px viewport
- `Slogan.tsx` — font size and gap adjustments on small screens
- Services — single column stacks fine, verify card padding

**3.3 — Performance**
- Lazy-load images below the fold (founder.jpeg, og-image.png)
- Check Lighthouse score post-build
- Verify `manifest.json` and `robots.txt` (already in public)

---

## File Checklist

| File | Status | Action |
|------|--------|--------|
| `src/routes/index.tsx` | ✅ good | Add Founder section |
| `src/routes/about.tsx` | ⚠️ stale styles | Rebuild (Phase 1.2) |
| `src/routes/__root.tsx` | ⚠️ missing SEO | Add meta tags (Phase 1.3) |
| `src/components/Slogan.tsx` | ✅ good | Minor mobile tweaks |
| `src/components/About.tsx` | ✅ good | No changes |
| `src/components/Services.tsx` | ✅ good | No changes |
| `src/components/Founder.tsx` | ⚠️ stale | Rebuild (Phase 2.1) |
| `src/components/BrandDefinition.tsx` | ❌ orphaned | Delete (Phase 1.1) |
| `src/components/Header.tsx` | ✅ good | Scroll behavior (Phase 3) |
| `src/components/Footer.tsx` | ✅ good | No changes |
| `src/components/ContactForm/` | ✅ good | No changes |
| `src/styles.css` | ✅ good | No changes |

---

## Assets Available

| File | Path | Use |
|------|------|-----|
| `logo-test.svg` | `/logo-test.svg` | Primary logo in code |
| `logomark-white.png` | `/logomark-white.png` | Hero section, footer |
| `soia-logo-white.png` | `/soia-logo-white.png` | Raster fallback |
| `soia-logo-black.png` | `/soia-logo-black.png` | Light backgrounds |
| `founder.jpeg` | `/founder.jpeg` | Founder section |
| `og-image.png` | `/og-image.png` | OG meta tag |
| `favicon.png` | `/favicon.png` | Tab icon |

---

## Start Here

Run `Phase 1` in order. Each step is self-contained and leaves the site in a better state.

```bash
cd /Users/mathewsfranco/Developer/soia
npm run dev   # http://localhost:3000
```
