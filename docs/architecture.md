# Architecture

## Goal

The repository separates visual identity from application framework choices. A style should be selectable before implementation, portable across projects, understandable by people, and consumable by tooling or AI agents.

## Layers

### 1. Catalog layer

`styles/<id>/manifest.json` is the source of truth for discovery and selection. It describes fit, trade-offs, visual traits, compatibility, fonts, and artifact locations.

`scripts/catalog.mjs` validates every manifest and generates:

- `catalog.json` for tools, future gallery applications, and search.
- The catalog section in the root `README.md` for humans.

Generated files are never edited directly.

### 2. Guidance layer

Each style has two intentionally different documents:

- `README.md` explains design rationale, selection criteria, composition, implementation, and accessibility.
- `PROMPT.md` is a concise execution brief for an AI agent working inside an existing frontend repository.

They may share essential rules, but the prompt should not become a copy of the guide.

### 3. Runtime layer

`src/core.css` owns framework-agnostic primitives and behavior. A style's `theme.css` only supplies the semantic values consumed by that contract.

```text
application component
        ↓
.sg-* primitive or --sg-* token
        ↓
shared semantic contract
        ↓
selected [data-style] theme
```

This makes styles interchangeable without creating one component implementation per style.

### 4. Evidence layer

A style's `assets/preview.*` shows the visual direction that the written rules must reproduce. A manifest may also expose an optional `files.demo` entry for an executable, representative implementation. Preview and demo are evidence, not a specification: brand names, copy, and proprietary artwork in a reference are never part of the style contract.

## Semantic token contract

Every ready theme defines these groups:

| Group | Required roles |
|---|---|
| Color | background, foreground, surface, primary, secondary, muted, accent, border, focus, danger |
| Typography | sans and mono stacks, base and control sizes, weights, and line height |
| Density | control height, gaps, and component padding |
| Geometry | control radius, surface radius, pill radius, border width |
| Elevation | small, medium, large, control, surface, input, badge, hover, active shadows |
| Motion | duration, easing, hover transform, active transform |
| Accessibility | focus width and focus offset |

A theme can add private variables, but shared components must depend only on the stable contract.

## Scoping and coexistence

Themes are scoped with `data-style` rather than `:root`:

```html
<section data-style="neo-brutalist">...</section>
```

This supports incremental adoption, embedded previews, and multiple themes in one catalog page. Shared selectors use `:where(...)` to keep specificity low, and all public classes and variables use the `sg` namespace.

## Framework adapters

Plain CSS is canonical. Tailwind CSS, React, Next.js, Vue, or other adapters should map to the semantic variables instead of restating literal values. This avoids version-specific style forks and lets host applications preserve their own component architecture.

## What belongs in core

Add something to `src/core.css` only when it:

1. has the same semantic purpose across multiple styles;
2. can be expressed entirely through the shared token contract; and
3. improves accessibility or removes repeated implementation work.

Page sections, product-specific components, illustration systems, and framework wrappers do not belong in core.

## Versioning

A style version describes its own contract and guidance:

- **Patch:** documentation correction or non-visual implementation fix.
- **Minor:** additive token, optional mode, or compatible guidance improvement.
- **Major:** changed visual identity, removed token, or behavior that can alter existing interfaces.

The repository version and individual style versions are independent.
