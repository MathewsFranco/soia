# SOIA Website — Complete Redesign Plan

> Created: 2026-03-13
> Brand reference: `outputs/design-system.md` (Visual Identity 2026 by @barbarahrizza.design)
> Repo: `/Users/mathewsfranco/Developer/soia`

---

## Premise

The current site was built before the official brand identity existed. This is a ground-up rebuild — not a patch. We keep the tech stack and the CSS foundation (tokens are already correct). Everything else gets replaced.

**Keep:**
- Stack: React 19, Vite, TypeScript, Tailwind CSS 4, TanStack Router, GSAP
- `src/styles.css` — colors, fonts, keyframes, form styles are already correct
- `src/components/ContactForm/` — form logic and validation is solid
- `public/` — all logo and image assets are ready

**Replace:**
- Every component except ContactForm
- Both route files (`index.tsx`, `about.tsx`)
- `__root.tsx` — add SEO, remove devtools from prod

---

## Design Direction

**Mood:** Black-first, editorial, premium. A luxury agency that speaks with authority and restraint.

**Background:** Pure black (`#000000`) throughout. Subtle warm wine glow at strategic moments (not on every section).

**Color use:**
- Wine (`#5D2A2D`) — accent only. Highlights, underlines, dots, hover states. Never a background.
- White — all body text and headings on dark
- Taupe (`#686058`) — metadata, captions, secondary labels
- No gradients except the ambient background glow

**Typography rhythm:**
- Roswell for every headline moment — tall, condensed, high-impact
- Open Sauce One for callout labels, section tags, UI hints
- Poppins Light for body paragraphs and form

**Spacing:** Generous. Sections breathe. 20–24px base padding, 80–120px vertical rhythm.

**Layout:** Mostly single-column with editorial asymmetric moments. No cards with drop shadows. No rounded corners on containers.

**Animations:** Entrance only. Fade-up on scroll. No looping or distracting motion. GSAP for scroll-triggered reveals.

---

## Site Architecture

```
/ (single-page, scroll-based)
├── <Head>        SEO meta, OG tags
├── <Nav>         Fixed top, minimal
├── <Hero>        Full viewport — oversized type, body bottom-anchored
├── <Pillars>     Brand values strip — staggered reveal
├── <About>       Brand story — large bg word parallax + line reveals
├── <Services>    3-column — horizontal scroll pin on desktop
├── <Marquee>     Scrubbed scrolling brand statement strip
├── <Founder>     Editorial — curtain wipe photo + parallax
├── <Contact>     Form + details — cascade reveal
└── <Footer>      Copyright bar

/about            Full "Quem Somos" page (optional Phase 2)
```

---

## Section-by-Section Design Spec

### Nav
- Fixed. Black background `bg-black`. Bottom border `border-white/8`.
- Left: `logo-test.svg` (SVG logotype). Right: nav links.
- Nav links: Poppins Light, 10–11px, `tracking-widest`, uppercase, `text-white/50` → `text-white` on hover.
- Mobile: hamburger → full-screen overlay menu.
- No scroll-based style change (keep it simple).

### Hero
- `min-h-screen`, centered content, black background.
- Large Roswell headline — two lines, large:
  - Line 1: `"Menos ruído."` — white
  - Line 2: `"Mais impacto."` — wine (`text-wine`)
- Below: 1–2 sentence brand statement in Poppins Light, white/60, max ~480px.
- Bottom-left or bottom-right: `logomark-white.png` at small size, ~40px, opacity 30% — as a graphic anchor.
- Entrance animation: headline words fade-up on load (staggered), not scroll-triggered.
- No background gradient in the hero — let the black breathe.

### Pillars Strip
- Thin horizontal band, `border-y border-white/10`.
- 4 values: `OUSADA · CRIATIVA · EXCLUSIVA · CONTEMPORÂNEA`
- Poppins Light, tracking-widest, uppercase, `text-white/50`, 11px.
- Wine dot (`·`) as separator.
- Scroll-reveal on enter.

### About
- Two-column on desktop (text left, decorative right), single column mobile.
- Left: section label (Open Sauce One, uppercase, taupe), then Roswell H2, then 2 Poppins Light paragraphs.
- Right: subtle brand element — the symbol SVG outline at large scale, very low opacity (wine/15), purely decorative.
- Or: no right column — just generous whitespace and a thin wine left-border accent on the section label.
- Keep the brand copy from the current `About.tsx` — it's already good.

### Services
- Section label + Roswell H2 header.
- 3 columns on desktop, stacked on mobile.
- Each service: icon (Lucide, `strokeWidth 1.25`), Open Sauce One title, Poppins list items.
- Dividers: `border-r border-white/8` between columns. No card backgrounds.
- Hover: very subtle `bg-wine/6` fill + icon shifts to `text-wine`.
- Keep the same service data — it's correct.

### Founder
- Full-width section. Black background.
- Left ~45%: portrait of Fabiana (`/founder.jpeg`). Editorial crop — no circle frame. Square or portrait ratio with a thin border `border border-white/8` or no border. Slightly desaturated via CSS `filter: grayscale(20%) contrast(1.05)`.
- Right: section label, Roswell H2 `"Fabiana Tomaz"`, Open Sauce One subtitle `"Fundadora & Estrategista"`, then Poppins bio text.
- Wine accent: a single horizontal line `w-12 h-px bg-wine` above the name.
- Mobile: image on top, text below.

### Contact
- Left: Roswell H2 `"Vamos conversar sobre a sua marca."` with `"sobre a sua marca."` in wine.
- Below heading: email + Instagram links with animated wine underline on hover.
- Right: `ContactForm` (keep as-is).
- Keep the `logomark-white.png` watermark at bottom of left column.

### Footer bar
- Single row. `border-t border-white/5`.
- Left: `© 2025 SOIA — Agência Boutique`
- Right: `Estratégia · Cultura · Branding`
- Both: Poppins Light, 10px, tracking-wide, `text-white/20`.

---

## Component Map

New file structure:

```
src/
├── components/
│   ├── Nav.tsx              ← replaces Header.tsx + SideMenu.tsx
│   ├── Hero.tsx             ← replaces Slogan.tsx
│   ├── Pillars.tsx          ← extract from index.tsx
│   ├── About.tsx            ← rewrite
│   ├── Services.tsx         ← keep data, refine layout
│   ├── Founder.tsx          ← rewrite
│   ├── Contact.tsx          ← replaces Footer.tsx (contact section)
│   ├── Footer.tsx           ← thin copyright bar only
│   ├── ContactForm/         ← keep unchanged
│   └── ui/
│       └── SectionLabel.tsx ← reusable: Open Sauce One label above headings
├── routes/
│   ├── __root.tsx           ← add SEO meta, clean up devtools
│   └── index.tsx            ← compose all sections, GSAP scroll setup
└── styles.css               ← no changes needed
```

**Delete:** `AnimatedGradientBg.tsx`, `InteractiveBlob.tsx`, `BrandDefinition.tsx`, `Founder.tsx` (replaced), `Slogan.tsx`, `Header.tsx`, `SideMenu.tsx`, `LogoMorphSVG.tsx`, `Typography.tsx`

---

## Build Order

Build in this sequence — each step renders correctly before moving to the next.

| # | Task | Component(s) | Animation |
|---|------|--------------|-----------|
| 1 | `__root.tsx` — SEO, ScrollSmoother wrapper | `__root.tsx` | ScrollSmoother setup |
| 2 | `Nav` | `Nav.tsx` | Slide-down on mount |
| 3 | `Hero` — oversized type, bottom-anchored body | `Hero.tsx` | Word clip reveal (SplitText) |
| 4 | `Pillars` strip | `Pillars.tsx` | Stagger fade-up |
| 5 | `About` — bg word + line reveals | `About.tsx` | Line clip + bg parallax |
| 6 | `Services` — horizontal scroll | `Services.tsx` | Pin + scrub (desktop) |
| 7 | `Marquee` — scrubbed brand strip | `Marquee.tsx` | x scrub |
| 8 | `Founder` — editorial photo | `Founder.tsx` | Clip wipe + parallax |
| 9 | `Contact` + `Footer` | `Contact.tsx`, `Footer.tsx` | Form cascade |
| 10 | `SectionLabel` utility | `ui/SectionLabel.tsx` | — |
| 11 | Wire all animations in `index.tsx` | `index.tsx` | Full GSAP orchestration |
| 12 | Mobile pass — 375px audit + disable horiz scroll | all | — |
| 13 | `/about` route rebuild | `routes/about.tsx` | Reuse patterns |

---

---

## Inspiration Takeaways

### new.studio
- Mixed type weight in the same headline: one word in italic serif, the rest in upright. Adapt for SOIA: `"Menos ruído."` in Roswell regular, `"Mais impacto."` in a lighter or italic variant — or reverse: body-weight contrast within the line.
- Body text anchored to the **bottom** of the hero viewport, not centered — creates a cinematic "caption under a film frame" feel.
- Word-by-word reveal: each word sits in an `overflow: hidden` container, slides up from `translateY(100%)`. Tight, clean, premium.
- Nav: minimal, translucent. Logo left, links right, no CTA button. Same direction for SOIA.
- Gradient background that moves on mouse — we'll keep the SOIA ambient glow but make it more intentional.

### Eventbrite Social Study
- **Oversized type as the hero** — headline fills the viewport edge to edge, ~15–20vw. The type IS the design.
- Asymmetric layout: big type top-left, body copy offset right — creates editorial tension.
- Number counters: `00%` → real value, scrubbed to scroll. Use for brand impact statement (e.g. a number about results or clients).
- Section headings used as full-bleed background text (low opacity, large) that parallaxes slightly — gives depth without imagery.

### GSAP Demos
- `toggleActions: "play pause resume reset"` — animations reverse on scroll back. Premium sites do this; most cheap sites don't.
- `scrub: 1` on text reveals makes them feel tied to physical scroll, not just triggered.
- Markers in development (`markers: true`) to tune start/end positions precisely.

---

## Animation Plan

### GSAP plugins available (all free in v3.14.2)
- `ScrollTrigger` — scroll-driven animation engine
- `ScrollSmoother` — smooth scroll + parallax via `data-speed` attributes
- `SplitText` — split headings into chars/words/lines for fine-grain animation
- `ScrollToPlugin` — programmatic smooth scroll to anchors

### Foundation: ScrollSmoother

Wrap the entire app in ScrollSmoother. This replaces `html { scroll-behavior: smooth }` and gives every section access to parallax via `data-speed` attributes.

```tsx
// src/routes/__root.tsx
const smoother = ScrollSmoother.create({
  wrapper: '#smooth-wrapper',
  content: '#smooth-content',
  smooth: 1.4,          // inertia (1 = none, 2 = heavy)
  smoothTouch: 0.1,     // reduced on touch devices
  effects: true,        // enables data-speed and data-lag
})
```

HTML structure:
```html
<div id="smooth-wrapper">     <!-- full-page scroll container -->
  <div id="smooth-content">  <!-- all page content goes here -->
    ...
  </div>
</div>
```

---

### Section-by-Section Animations

#### Nav
- On mount: slides down from `y: -100` → `y: 0`, fade in. Duration 0.6s, after a 0.3s delay (lets hero render first).
- No scroll-based behavior — stays fixed, always visible.

#### Hero — oversized type, bottom-anchored body (inspired by new.studio + Eventbrite)

**Layout:** Full viewport. Roswell headline at `clamp(4rem, 12vw, 11rem)` — fills the width on large screens like Eventbrite. Body text and scroll cue pinned to the **bottom** of the viewport (absolute positioned), not centered. Creates a film-poster feel.

**Entrance animation — word-by-word clip reveal (new.studio pattern):**
Each word in the headline is wrapped in an `overflow: hidden` span. Words slide up from `translateY(105%)` with stagger. No opacity — purely positional, which looks more physical.

```ts
const tl = gsap.timeline({ delay: 0.2 })

// Split headline into words, each in overflow:hidden wrapper
const words = new SplitText('.hero-headline', { type: 'words', wordsClass: 'word-wrap overflow-hidden' })

tl.from(words.words, {
  yPercent: 105,
  duration: 0.9,
  stagger: 0.08,
  ease: 'power3.out',
})
.from('.hero-tagline', { yPercent: 105, duration: 0.7, ease: 'power2.out' }, '-=0.4')
.from('.hero-body', { opacity: 0, y: 12, duration: 0.8, ease: 'power2.out' }, '-=0.3')
.from('.hero-scroll-cue', { opacity: 0, duration: 0.6 }, '-=0.2')
```

**Background:** No gradient blob — instead, the SOIA logomark at ~60vw, centered, opacity 4%, acts as a watermark. It parallaxes at `data-speed="0.6"` — floats as you scroll.

#### Hero → About transition — scrubbed fade + scale
As hero scrolls out of view, it doesn't just leave — it **scales down slightly** (`scale: 1 → 0.96`) and fades out (`opacity: 1 → 0`), scrubbed to scroll position. The next section slides under it. Feels like pages turning.

```ts
gsap.to('#hero', {
  opacity: 0,
  scale: 0.96,
  ease: 'none',
  scrollTrigger: {
    trigger: '#hero',
    start: 'bottom 80%',
    end: 'bottom 20%',
    scrub: 1,
  }
})
```

#### Pillars Strip — staggered word reveal
Each pillar word fades up from `y: 12` with stagger. The separator dots (·) scale in from 0 after the words.

```ts
gsap.from('.pillar-word', {
  y: 12, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
  scrollTrigger: { trigger: '.pillars-strip', start: 'top 85%' }
})
```

#### About — line reveal + symbol draw
1. Section label slides in from `x: -16, opacity: 0`.
2. Heading: `SplitText` split into **lines** (not chars). Each line clips up from below using `clipPath: 'inset(100% 0 0 0)' → 'inset(0% 0 0 0)'` with stagger 0.15s. Feels like words printing into existence.
3. Body paragraphs: standard fade-up, staggered.
4. Decorative symbol SVG (if used): stroke-dashoffset animation — draws itself as you scroll into view. Speed tied to `scrub: 1`.

```ts
const lines = new SplitText('.about-heading', { type: 'lines', linesClass: 'line-wrap' })
// wrap each line in a clip container first
gsap.from(lines.lines, {
  yPercent: 110, stagger: 0.15, duration: 0.8, ease: 'power3.out',
  scrollTrigger: { trigger: '.about-heading', start: 'top 80%' }
})
```

#### About — large background word + content overlay (Eventbrite pattern)
Behind the about text content, the word `"SOIA"` or `"SOAR"` renders at ~30vw in Roswell, `text-wine/4` opacity, positioned absolute. It parallaxes at `data-speed="0.75"` — scrolls slower than the foreground text, creating genuine depth without imagery.

The section label + heading use the `toggleActions: "play pause resume reset"` pattern — animations reverse as you scroll back up. Feels alive, not pre-recorded.

```ts
gsap.from('.about-lines', {
  yPercent: 110,
  stagger: 0.12,
  duration: 0.85,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.about-section',
    start: 'top 75%',
    toggleActions: 'play pause resume reset',
  }
})
```

#### Services — horizontal scroll on desktop
On desktop (≥768px): the services section **pins** while the 3 columns scroll horizontally, driven by vertical scroll. This creates the "swipe through content while scrolling down" premium feel.

```ts
// Only on desktop
if (window.innerWidth >= 768) {
  const track = document.querySelector('.services-track')
  gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth + 160),
    ease: 'none',
    scrollTrigger: {
      trigger: '.services-section',
      start: 'top top',
      end: () => `+=${track.scrollWidth}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    }
  })
}
```

On mobile: normal vertical stack, standard fade-up reveals.

#### Manifesto strip — scrubbed marquee (between Services and Founder)
A full-width strip with the brand statement scrolling horizontally, **scrubbed to scroll position**. As you scroll down, the text moves right-to-left. Stays in place when you stop scrolling. Feels mechanical and intentional.

```ts
gsap.to('.marquee-track', {
  xPercent: -50,
  ease: 'none',
  scrollTrigger: {
    trigger: '.marquee-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
  }
})
```

Content: `"Menos ruído. Mais impacto. — Menos ruído. Mais impacto. —"` (repeated). Roswell, large, wine color, on black.

#### Founder — image wipe reveal + parallax
1. **Image wipe:** The founder photo reveals with a `clipPath` sweep from left to right, scrubbed to scroll entry. Feels like a curtain opening.
   ```ts
   gsap.fromTo('.founder-photo',
     { clipPath: 'inset(0 100% 0 0)' },
     { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power2.inOut',
       scrollTrigger: { trigger: '.founder-section', start: 'top 70%' } }
   )
   ```
2. **Parallax:** Photo scrolls at `data-speed="0.85"` (slightly slower than page) — creates depth.
3. **Wine accent line:** Expands from `scaleX: 0 → 1`, origin left, when section enters.
4. **Name + title:** Fade up after wine line completes.

#### Contact — form field cascade
Each form field fades up with a stagger as the contact section scrolls into view. The heading does a line reveal (same technique as About).

```ts
gsap.from('.form-field', {
  y: 24, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
  scrollTrigger: { trigger: '.contact-form', start: 'top 85%' }
})
```

#### Background parallax (ambient)
The wine glow radial gradients in `body` don't move. Instead, add 1–2 subtle positioned elements with `data-speed` attributes on `#smooth-content` children:
- A faint large logomark watermark centered in the page: `data-speed="0.7"` — scrolls slower, creates depth layer.
- Wine accent line that spans full width at a section break: `data-speed="1.1"` — scrolls slightly faster, gives the page a layered feel.

---

### Scroll Speed / Rhythm Reference

| Section | Entry animation | Scroll behavior |
|---------|----------------|-----------------|
| Hero | Timeline on load — chars, body, mark | Pinned for 200px scroll |
| Pillars | Stagger fade-up on enter | Normal speed |
| About | Line clip reveal, symbol draw | Normal speed |
| Services | Stagger fade-up on enter | **Horizontal pin** (desktop) |
| Founder | Clip wipe + parallax | `data-speed="0.85"` on photo |
| Contact | Line reveal + form stagger | Normal speed |
| Footer | Fade in | Normal speed |

---

### Implementation Notes

- Register all plugins once at the top of `index.tsx`: `gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin)`
- Kill/refresh ScrollTrigger on route change: use `ScrollTrigger.killAll()` in cleanup
- Respect `prefers-reduced-motion` — wrap all animation setup in `if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches)`
- SplitText creates extra DOM nodes — only call it inside `useGSAP` so it re-runs cleanly on mount
- Horizontal scroll section: add `overflowX: hidden` to `body` to prevent scrollbar flash during pin

---

## Open Questions (decide before building)

1. **Mobile nav** — full-screen overlay or slide-down? Full-screen overlay is more premium.
2. **About section right column** — decorative symbol SVG or just whitespace?
3. **Founder photo** — square editorial crop or portrait?
4. **Language** — all Portuguese, or intentionally mixed? Pick one and be consistent.
5. **`/about` route** — separate page or fold everything into the home scroll?

---

*Plan is ready. Start with `Nav` + `ScrollSmoother` setup (step 1–2), which unblocks every other section.*
