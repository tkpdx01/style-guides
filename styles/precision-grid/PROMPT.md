# Precision Grid implementation brief

Implement the requested interface as a compact, professional productivity workspace. Preserve the target repository's framework, components, routing, data behavior, and accessibility conventions. Reuse `style-guides/core.css` and `style-guides/themes/precision-grid.css` when available instead of recreating the token values.

## Product fit

Use this system for data analysis, operations, finance, administration, reporting, inventory, or repeated keyboard-led data entry. If the product is touch-first, marketing-led, editorial, or intentionally spacious, state that Precision Grid is a poor fit rather than forcing the style.

## Visual contract

- Use cool neutral application chrome and white or near-white data surfaces.
- Use deep green for primary action and selection, blue for keyboard focus and links, and red for destructive or invalid states.
- Use 1px dividers and grid lines. Keep control radii at 3px and surface radii at 4px.
- Avoid decorative shadows. Use a shallow shadow only when a surface genuinely floats above another layer.
- Set application chrome in Segoe UI Variable, Segoe UI, Inter, or system UI.
- Prefer Aptos Narrow or another tested narrow sans for data cells; use tabular numerals and right-align comparable numbers.
- Keep most text at 11–13px. Use 12/16px for base UI and data, 16/22px for sections, and at most 18/24px for the workspace title.
- Use 24px grid rows and 28px controls in compact mode. Support 32px rows and 36px controls through `data-density="comfortable"`.
- Use 90ms state transitions without translation, bounce, parallax, or ornamental animation.

## Composition

Structure the page as a continuous working surface rather than a dashboard made of many cards. Favor compact app chrome, grouped toolbars, query or formula bars, sticky headers, frozen identifiers, dense tables, inspectors, view tabs, and status bars.

Use a 2px spacing base with frequent 4, 8, 12, and 16px steps. Keep related controls on one row when space allows. Establish hierarchy with alignment, semibold headers, neutral background steps, and borders before increasing font size.

On narrow screens, preserve column geometry with horizontal scrolling, collapse secondary toolbar groups, and move inspectors into a drawer or below the grid. Do not convert analytical tables into unrelated cards unless the product task changes.

## Interaction

- Make hover a restrained neutral background change.
- Keep active feedback immediate and stationary.
- Distinguish keyboard focus from row, cell, or item selection.
- For spreadsheet grids, use roving `tabindex`, arrow-key navigation, and accessible row and column labels.
- Preserve dimensions while loading and after sorting so the user's scan position does not jump.
- Pair error, read-only, filter, sorting, and status colors with text, iconography, or semantic attributes.
- Respect `prefers-reduced-motion`.

## Avoid

- Marketing hero typography, large empty areas, gradient spectacle, glass effects, oversized cards, floating pills everywhere, and heavy shadows.
- Copying Microsoft names, logos, Ribbon icons, branded colors, workbook content, or product copy.
- Using 10px text for required information.
- Shrinking targets without offering a comfortable mode or confirming desktop-only input.
- Making every table cell a sequential tab stop.
- Hard-coding library-specific palette values instead of mapping to `--sg-*` tokens.

## Delivery

Implement production-ready responsive states, keyboard behavior, focus, empty and error states, loading stability, and dark mode when the host product supports it. Run the target repository's formatter, type checks, tests, and build. Report any verification that cannot be completed.
