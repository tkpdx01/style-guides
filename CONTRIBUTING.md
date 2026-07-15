# Contributing

## Add a style

1. Copy `templates/style/` to `styles/<style-id>/`.
2. Use a stable, lowercase kebab-case id.
3. Replace every placeholder in `manifest.json`, `README.md`, `PROMPT.md`, and `theme.css`.
4. Add a representative `assets/preview.png`, `assets/preview.webp`, or original `assets/preview.svg` that you are allowed to store and redistribute.
5. Add an executable Demo when interaction, density, or responsive behavior cannot be judged from a static preview. Expose it as the optional `files.demo` manifest entry.
6. Keep the style in `draft` until its guide, prompt, theme, responsive behavior, and accessibility states have been reviewed.
7. Run `npm run catalog:build`.
8. Run `npm run check` and review the generated root catalog and `catalog.json`.

Never edit the generated catalog section or `catalog.json` by hand.

## Definition of ready

A style may use `status: "ready"` only when it has:

- a distinct visual identity that cannot be expressed as a minor variation of an existing style;
- explicit `bestFor` and `avoidFor` criteria;
- all required semantic tokens in `theme.css`;
- visible keyboard focus, disabled states, and reduced-motion behavior through the core contract;
- a real preview that matches the written rules;
- any manifest-listed Demo opens locally and demonstrates the states claimed by the guide;
- human guidance that covers composition and accessibility, not only colors;
- an AI prompt that tells an agent to preserve the host application's architecture;
- successful `npm run check` validation.

## Writing manifests

The schema is `schemas/style-manifest.schema.json`.

- `summary` is the short catalog description.
- `description` may add nuance but must remain useful outside the guide.
- `tags` are searchable lowercase kebab-case terms.
- `traits` use only the controlled values documented in `docs/selecting-a-style.md`.
- `bestFor` and `avoidFor` describe product contexts, not implementation frameworks.
- `compatibleWith` lists verified integration targets.
- File paths remain relative to the style directory and must not escape it.
- `files.demo` is optional, but when present it must point to a self-contained local entry file that works without a build step.

## Writing guides

A guide should answer:

1. When should this style be chosen or rejected?
2. Which visual decisions make it recognizable?
3. How should layout, type, color, geometry, elevation, and motion work together?
4. How does a project consume its runtime theme?
5. Which accessibility mistakes are most likely?
6. Where are the manifest, prompt, theme, and preview?

Avoid pinning transient framework versions in the canonical guide. Put framework-specific mapping behind semantic tokens.

## Writing prompts

Prompts are execution briefs, not documentation mirrors. They should tell an agent to:

- inspect and preserve the target repository's conventions;
- reuse the canonical theme when available;
- implement the visual contract and responsive behavior;
- avoid recognizable anti-patterns;
- protect accessibility and product behavior;
- run the target repository's verification commands.

Do not include the reference product's brand, copy, logo, or proprietary illustration as a requirement.

## Changing the core contract

Changes to `src/core.css` affect every style. Before adding or renaming a public `.sg-*` class or `--sg-*` variable:

1. verify that the concept applies to more than one style;
2. preserve backward compatibility when possible;
3. update the template theme and architecture documentation;
4. test all ready themes; and
5. treat removals or meaning changes as breaking changes.

## Asset guidance

- Prefer PNG or WebP for rendered previews and SVG for original diagrams, interface mockups, or icons.
- Crop browser chrome unless it helps explain the source context.
- Remove private tabs, account details, tokens, and unrelated personal information.
- Record attribution or license notes in the style guide when required.
- Optimize large images before adding multiple variants.
