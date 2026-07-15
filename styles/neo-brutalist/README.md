# Neo-Brutalist

> A warm, tactile theme with bold outlines, solid offset shadows, rounded geometry, and playful physical feedback.

![Neo-Brutalist preview](./assets/preview.png)

Reference: [hapi.run](https://hapi.run/) — retained as visual study evidence; its brand, copy, and artwork are not part of the reusable style contract.

| Status | Version | Best fit |
|---|---:|---|
| Ready | 2.0.0 | Marketing pages, developer tools, creative products, friendly consumer experiences |

## Choose this style when

Use Neo-Brutalist when a product should feel confident, approachable, and visibly handcrafted. It works best with short content blocks, strong calls to action, illustrations, and generous spacing.

Avoid it for dense administrative interfaces, long financial tables, or brands that need a quiet luxury tone. Heavy borders and shadows create visual cost; they should mark hierarchy, not wrap every element.

## Visual language

1. **Warm foundation.** Use cream instead of clinical white and near-black instead of pure black.
2. **Structural outlines.** Two-pixel borders define interactive controls and important surfaces.
3. **Solid shadows.** Shadows have no blur. Their offset makes controls feel printed or physically stacked.
4. **Rounded confidence.** Large radii soften the visual weight without turning every shape into a pill.
5. **Purposeful color.** Coral is reserved for primary actions and emphasis; mint and yellow support status and illustration.
6. **Physical motion.** Hover lifts an element up and left; active state presses it down and right.

## Runtime usage

The canonical implementation is framework-agnostic CSS:

```css
@import "style-guides/core.css";
@import "style-guides/themes/neo-brutalist.css";
```

Apply the theme at a stable application boundary:

```html
<main data-style="neo-brutalist">
  <span class="sg-badge">v2.0 ready</span>

  <article class="sg-card">
    <h2>Build with personality</h2>
    <p class="sg-muted">Shared primitives consume the selected theme tokens.</p>
    <button class="sg-button sg-button--primary">Get started</button>
  </article>
</main>
```

Use `data-color-scheme="dark"` on the same element to activate the included dark token set:

```html
<main data-style="neo-brutalist" data-color-scheme="dark">
  <!-- content -->
</main>
```

## Token contract

The implementation lives in [`theme.css`](./theme.css). These are the values that carry the style's identity:

| Role | Value |
|---|---|
| Background | `hsl(45 40% 96%)` |
| Foreground and border | `hsl(30 20% 9%)` |
| Primary | `hsl(8 75% 56%)` |
| Secondary | `hsl(145 52% 82%)` |
| Accent | `hsl(48 100% 50%)` |
| Control border | `2px solid` |
| Surface radius | `1.25rem` |
| Default shadow | `4px 4px 0` |
| Large shadow | `8px 8px 0` |
| Interaction | `translate(-2px, -2px)` over `180ms` |

Applications should consume semantic variables such as `--sg-color-primary` and `--sg-shadow-surface`; do not copy literal color values into components.

## Typography

- **Primary:** Nunito, weight 400–800. Its rounded shapes offset the hard outlines.
- **Monospace:** Space Mono, weight 400–700. Use for metrics, versions, code, and small technical labels.
- Keep body text at `1rem` or larger with approximately `1.5` line height.
- Use large, compact display headings, but limit line length to keep the page energetic rather than crowded.

Fonts are not fetched by the theme. Load them through the host application's preferred mechanism and retain the provided system fallbacks.

## Composition

- Use a relaxed vertical rhythm and a content width between `68rem` and `76rem`.
- Let one hero element dominate. Do not give every card the large shadow.
- Alternate outlined surfaces with open background space.
- Keep paragraphs near `65ch`; the style's bold geometry should not reduce readability.
- Prefer asymmetrical illustration and small overlapping labels over decorative gradients.

## Shared primitives

[`src/core.css`](../../src/core.css) exposes a small stable layer:

| Primitive | Purpose |
|---|---|
| `.sg-button` with `--primary`, `--secondary`, or `--ghost` | Calls to action |
| `.sg-card` | Elevated content surface |
| `.sg-input` | Textual form controls |
| `.sg-badge` | Status and category labels |
| `.sg-muted`, `.sg-mono` | Text roles |
| `.sg-shadow-*`, `.sg-interactive` | Low-level composition helpers |

Build product-specific components from these tokens and behaviors instead of expanding the shared layer for every page pattern.

## Tailwind CSS adapter

Tailwind CSS can reference the canonical CSS variables without maintaining a second palette:

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        background: "var(--sg-color-background)",
        foreground: "var(--sg-color-foreground)",
        primary: "var(--sg-color-primary)",
        secondary: "var(--sg-color-secondary)",
        surface: "var(--sg-color-surface)",
        border: "var(--sg-color-border)",
      },
      fontFamily: {
        sans: ["var(--sg-font-sans)"],
        mono: ["var(--sg-font-mono)"],
      },
      boxShadow: {
        hard: "var(--sg-shadow-md)",
        "hard-lg": "var(--sg-shadow-lg)",
      },
    },
  },
}
```

## Accessibility guardrails

- Never remove the blue focus ring solely because it differs from the coral palette.
- Respect `prefers-reduced-motion`; the core contract reduces transitions automatically.
- Keep important text on solid surfaces, not across illustrations or decorative shapes.
- Do not communicate status with mint, coral, or yellow alone; pair color with copy or an icon.
- Preserve a minimum 44-pixel interactive target even when a control looks visually compact.
- Use the dark scheme as a deliberate mode, not by inverting the screenshot or applying filters.

## AI implementation

Use [`PROMPT.md`](./PROMPT.md) as the portable implementation brief. It describes the visual rules, constraints, and expected output without duplicating the full human rationale.

The catalog metadata used for selection and tooling is in [`manifest.json`](./manifest.json).
