# Precision UI implementation brief

Implement the requested interface as a compact, sharp, professional application page. Preserve the target repository's framework, routing, behavior, data flow, and component conventions. Reuse `style-guides/core.css` and `style-guides/themes/precision-ui.css` when available.

## Product fit

Use Precision UI for SaaS applications, enterprise portals, internal tools, developer products, operational dashboards, account areas, settings, and other information-rich pages. Use Precision Grid instead when the primary interaction is spreadsheet-like cell navigation or repeated data entry.

Reject this style for brand-led marketing, touch-first consumer products, long-form editorial reading, or interfaces whose identity depends on expressive illustration and motion.

## Visual contract

- Use Segoe UI Variable, Segoe UI, Inter, or the system sans-serif stack.
- Set base UI text to 13/18px, auxiliary text to 11–12px, section headings to 16–18px, and page titles to 20–24px.
- Use 32px controls in compact mode and 36px controls in comfortable mode.
- Use cool white and gray surfaces with cobalt blue for primary actions and active navigation.
- Use 1px borders, 4px control radii, 6px surface radii, and shallow shadows only for real layer separation.
- Use an 8px primary spacing rhythm with 4, 12, 16, 20, and 24px supporting steps.
- Use tabular numerals for metrics and Cascadia Mono or Consolas for code, identifiers, and technical values.
- Keep transitions between 100 and 120ms with no bounce, parallax, or large translation.

## Composition

Build a conventional application shell rather than spreadsheet chrome:

1. a compact side or top navigation area;
2. global search and account actions;
3. breadcrumb, page title, short context, and page-level action;
4. a small number of border-led panels, KPI strips, lists, tables, forms, or charts;
5. secondary information grouped through alignment and dividers rather than nested cards.

Use cards for independent modules, not every row or field. Prefer continuous lists, definition grids, split panels, and section dividers. Keep pages within a readable maximum width while allowing dashboards to use the full available workspace.

On narrow screens, collapse the sidebar into an overlay, stack dashboard regions, preserve horizontal table scrolling, and keep primary page actions visible. Do not reduce critical targets below the host product's accessibility requirements.

## Interaction

- Hover changes background or border subtly without lifting the component.
- Active states use a darker fill or inset emphasis.
- Selected navigation uses color, a visible edge, and `aria-current`.
- Focus uses the independent blue focus token and remains visible in dark mode.
- Filters and form validation communicate state through text and semantics in addition to color.
- Preserve panel and list dimensions during loading to avoid layout shifts.
- Respect `prefers-reduced-motion`.

## Avoid

- Formula bars, spreadsheet coordinates, sheet tabs, infinite cell grids, or ribbon-style command strips.
- Marketing hero typography, gradients used as decoration, glass effects, oversized radius, floating pills, and deep shadows.
- Copying Microsoft, Linear, GitHub, or another product's brand, navigation labels, icons, or content.
- Hard-coded framework palettes that fork the canonical `--sg-*` values.

## Delivery

Implement responsive layouts, keyboard navigation, focus, empty, loading, error, disabled, and dark states according to the host product's architecture. Run its formatter, type checks, tests, and build, and report any verification that could not be completed.
