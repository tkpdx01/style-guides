# Style Name

> One sentence describing the visual identity and intended experience.

Preview: replace `assets/README.md` with a representative `assets/preview.png`, then add the image here before review.

## Choose this style when

Describe the products, users, content, and brand tone that benefit from this style. State the strongest reasons to reject it as well.

## Visual language

Document the small set of decisions that make the style recognizable:

1. color roles;
2. typography;
3. geometry;
4. elevation and borders;
5. motion;
6. imagery or decoration.

## Runtime usage

```css
@import "style-guides/core.css";
@import "style-guides/themes/style-id.css";
```

```html
<main data-style="style-id">
  <article class="sg-card">
    <button class="sg-button sg-button--primary">Primary action</button>
  </article>
</main>
```

## Token contract

Summarize the identity-carrying semantic values. Keep literal values in `theme.css` and application components on `--sg-*` variables.

## Typography

Define font roles, weights, scale, line length, and loading expectations.

## Composition

Explain spacing, content width, hierarchy, responsive adaptation, and the correct balance between open space and surfaces.

## Framework adapters

Show only mappings that preserve `--sg-*` as the canonical source. Do not fork the palette or pin a transient framework version.

## Accessibility guardrails

Document contrast, focus, motion, target size, state communication, and style-specific failure modes.

## AI implementation

Use [`PROMPT.md`](./PROMPT.md) for AI-assisted implementation. Catalog metadata lives in [`manifest.json`](./manifest.json), and runtime values live in [`theme.css`](./theme.css).
