# Style Guides

> A curated frontend style library for choosing, documenting, and implementing visual systems with humans and AI agents.

This repository is not a screenshot archive or a collection of one-off starter projects. Each style is a portable theme built on the same semantic CSS contract, with enough design guidance to reproduce the result in any frontend stack.

## Start here

### Choose a style

1. Browse the catalog below.
2. Compare the five traits: density, contrast, energy, shape, and motion.
3. Open the style guide to verify that its strengths and trade-offs fit the product.
4. Use its `PROMPT.md` when delegating implementation to an AI agent.

See [Selecting a style](./docs/selecting-a-style.md) for the full decision process.

### Use a style

Import the shared component contract and exactly one theme:

```css
@import "style-guides/core.css";
@import "style-guides/themes/neo-brutalist.css";
```

Activate the theme on the application root:

```html
<body data-style="neo-brutalist">
  <button class="sg-button sg-button--primary">Get started</button>
</body>
```

The core uses namespaced `.sg-*` classes and `--sg-*` tokens, so it can coexist with Tailwind CSS, CSS Modules, component libraries, or application-specific styles.

## Style catalog

<!-- catalog:start -->
| Preview | Style | Traits | Best for |
|---|---|---|---|
| <a href="./styles/neo-brutalist/README.md"><img src="./styles/neo-brutalist/assets/preview.png" width="260" alt="Neo-Brutalist preview"></a> | **[Neo-Brutalist](./styles/neo-brutalist/README.md)**<br>Warm, playful interfaces with bold borders, solid shadows, and tactile motion.<br>`warm` `playful` `high-contrast` `hard-shadows` `bold-borders` `handcrafted` | density: `relaxed`<br>contrast: `high`<br>energy: `bold`<br>shape: `rounded`<br>motion: `expressive` | SaaS landing pages<br>Developer tools<br>Creative portfolios<br>Friendly consumer products |
<!-- catalog:end -->

## Repository structure

```text
style-guides/
├── catalog.json                 # Generated machine-readable catalog
├── src/core.css                 # Shared semantic tokens and primitives
├── styles/<style-id>/
│   ├── manifest.json            # Catalog source of truth
│   ├── README.md                # Human design and implementation guide
│   ├── PROMPT.md                # Portable AI implementation brief
│   ├── theme.css                # Runtime theme implementation
│   └── assets/preview.png       # Evidence of the visual direction
├── templates/style/             # Copyable scaffold for a new style
├── schemas/                     # Manifest and catalog contracts
├── scripts/catalog.mjs          # Validation and catalog generation
└── docs/                        # Architecture and selection guidance
```

## Design principles

- **One contract, many themes.** Components consume semantic tokens instead of knowing a style by name.
- **One source of truth.** A style's `manifest.json` generates both `catalog.json` and the root catalog.
- **Framework-agnostic first.** Plain CSS is the canonical implementation; framework examples are adapters.
- **Evidence over adjectives.** Every ready style has a representative preview and explicit fit criteria.
- **Accessible by default.** Keyboard focus, reduced motion, readable contrast, and disabled states belong in the contract.
- **Useful to humans and agents.** Human rationale and AI instructions are separate artifacts with different jobs.

## Commands

```bash
npm run catalog:build  # validate manifests and regenerate catalogs
npm run catalog:check  # fail when manifests or generated files drift
npm run themes:check   # verify every theme implements the core token contract
npm run links:check    # verify local links in Markdown files
npm run check          # run all repository validation
```

To add or refine a style, follow [CONTRIBUTING.md](./CONTRIBUTING.md). The architectural rationale is documented in [docs/architecture.md](./docs/architecture.md).
