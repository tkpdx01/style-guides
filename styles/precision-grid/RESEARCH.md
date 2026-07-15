# Precision Grid research notes

This style translates patterns from desktop productivity software into an original, framework-agnostic system. The sources establish constraints and useful ranges; they are not templates to copy.

## Findings

### Separate application chrome from worksheet data

Microsoft describes Segoe as the standard Office interface typeface and lists 14px body, 11px caption, and 10px annotation sizes for Office add-ins. Fluent 2 uses 12/16px for Caption 1. These references support a 12/16px baseline for dense desktop chrome, with 11px reserved for secondary labels and 10px used only for nonessential annotations.

Aptos is Microsoft's current Office document family. Its condensed weights are explicitly intended to help Excel users fit more information into spreadsheets and tables. Precision Grid therefore treats the data face as a distinct role: `Aptos Narrow` when installed, followed by narrow and system fallbacks. The font is referenced by name only; it is not redistributed by this repository.

### Density must be intentional and scoped

Microsoft recommends compact control sizing for mouse- and keyboard-led productivity, data-entry, table, form, and settings experiences. It recommends default sizing for touch-first consumer applications. Precision Grid follows the same boundary: compact is the default desktop mode, and a comfortable mode is provided for mixed input or lower-density needs.

Excel documents a default worksheet row height of 15 points, approximately 20px at 96 DPI. Carbon's extra-small data table row is 24px, while its compact table typography uses 14/18px. Precision Grid chooses a 24px compact row and 28px controls: denser than general-purpose design systems, but with enough room for clear focus, selected, and status states.

### Hierarchy should not depend on large type

Dense professional tools use repeated alignment, one-pixel dividers, background steps, semibold headers, and numeric alignment to establish hierarchy. Precision Grid keeps most interface text between 11px and 13px, limits page titles to 18px, and uses `font-variant-numeric: tabular-nums` for metrics and grid data.

### Cross-platform alternatives

Inter is designed for detailed user interfaces and provides an optical-size axis whose text end improves small-size legibility. IBM Carbon uses IBM Plex Sans at 14/18px for compact body and header text. Either is a strong cross-platform substitution when a Microsoft-compatible local stack is not desired; the layout metrics should still be tested because condensed and non-condensed faces change column capacity.

## Adopted specification

| Role | Compact specification | Usage |
|---|---:|---|
| Annotation | 10/14px, 600 | Rare, nonessential metadata only |
| Caption | 11/16px, 400–600 | Field labels, timestamps, status text |
| UI and data | 12/16px, 400 | Toolbar labels, cells, body copy |
| Emphasis | 13/18px, 600 | Important controls and panel headings |
| Section title | 16/22px, 600 | Major workspace sections |
| Page title | 18/24px, 600 | One per workspace, never a marketing hero |
| Grid row | 24px | Compact desktop mode |
| Control | 28px | Compact mouse/keyboard mode |
| Grid row | 32px | Comfortable mode |
| Control | 36px | Comfortable mixed-input mode |

Spacing uses a 2px base with practical steps at 2, 4, 6, 8, 12, 16, and 24px. Borders are normally 1px. Control radii are 3px, surface radii are 4px, and shadows are limited to floating or layered surfaces.

## Sources

- [Fluent 2 typography](https://fluent2.microsoft.design/typography)
- [Fluent 2 layout and spacing](https://fluent2.microsoft.design/layout)
- [Office Add-ins typography](https://learn.microsoft.com/en-us/office/dev/add-ins/design/add-in-typography)
- [Windows compact sizing](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/compact-sizing)
- [Aptos font family](https://learn.microsoft.com/en-us/typography/font-list/aptos)
- [Excel column width and row height](https://support.microsoft.com/en-US/Excel/change-the-column-width-and-row-height)
- [Carbon data table style](https://carbondesignsystem.com/components/data-table/style/)
- [Carbon typography type sets](https://carbondesignsystem.com/elements/typography/type-sets/)
- [Inter typeface documentation](https://rsms.me/inter/)
- [Material density guidance](https://m2.material.io/develop/web/supporting/density)
