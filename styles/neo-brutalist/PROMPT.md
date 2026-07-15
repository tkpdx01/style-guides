# Neo-Brutalist implementation brief

Implement the requested interface in the repository's existing stack using the Neo-Brutalist visual system below. Preserve existing product behavior, accessibility, routing, data flow, and component conventions.

## Before coding

- Inspect the current design tokens, reusable components, responsive conventions, and font loading.
- Reuse `src/core.css` and `styles/neo-brutalist/theme.css` when they exist.
- Adapt the visual system to the current stack instead of introducing a second framework or replacing working primitives.
- Treat the reference as a system, not as permission to copy its brand, text, or illustration.

## Visual contract

- Warm cream page background; near-black foreground and structural borders.
- Coral primary action, mint secondary surfaces, yellow used sparingly as an accent.
- Two-pixel dark borders on important controls and surfaces.
- Solid offset shadows with no blur: 2px small, 4px default, 8px only for major emphasis.
- Rounded controls around 0.85rem and surfaces around 1.25rem.
- Nunito-like rounded sans typography; Space Mono-like monospace for metrics and technical labels.
- Relaxed spacing, large display headings, short readable paragraphs, and one dominant visual per section.

Use semantic `--sg-*` tokens. Do not scatter literal colors, radii, or shadow values through components.

## Interaction

- Hover: move interactive elements 2px up and left while increasing the solid shadow.
- Active: move them 2px down and right while reducing the shadow.
- Keep transitions near 180ms with a responsive ease-out curve.
- Preserve visible keyboard focus and disabled states.
- Disable nonessential motion for `prefers-reduced-motion`.

## Component behavior

- Primary buttons use coral; secondary controls use mint; ghost controls use the white surface.
- Cards use white surfaces, strong borders, and default hard shadows.
- Inputs use a smaller hard shadow and a high-contrast focus indicator.
- Badges are compact rounded labels, not substitutes for buttons.
- Use large shadows selectively. Repetition weakens hierarchy and makes dense interfaces noisy.

## Composition

- Keep content within roughly 68–76rem and use generous section spacing.
- Combine open cream space with a limited number of outlined surfaces.
- Prefer asymmetry, small overlaps, and illustration-like decoration over gradients and glass effects.
- Keep body text near 65 characters per line.
- On small screens, remove decorative overlap before reducing readable type or tap targets.

## Avoid

- Blurred drop shadows, glassmorphism, glossy gradients, or hairline gray borders.
- Pure white full-page backgrounds and pure black text when the semantic tokens are available.
- Wrapping every text block in a bordered card.
- Pill shapes for every control.
- Decorative motion that changes layout or obscures content.
- Copying the reference brand, wording, logo, or proprietary artwork.

## Accessibility

- Maintain WCAG AA contrast for text and controls.
- Keep interactive targets at least 44×44 CSS pixels where practical.
- Pair color-coded state with text or icons.
- Verify keyboard order, focus visibility, hover/active/disabled states, reduced motion, and responsive behavior.

## Delivery

Produce production-ready code that matches the repository's conventions. Reuse existing components, keep style decisions tokenized, and include only dependencies that are necessary. After implementation, run the relevant formatter, type checks, tests, and build; report any verification that could not be completed.
