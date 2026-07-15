# Selecting a style

A good style choice follows the product's communication needs, not personal preference or a single attractive screenshot.

## 1. Define the product constraints

Write down these facts before browsing:

- primary users and their level of domain expertise;
- dominant task: read, decide, explore, create, monitor, or transact;
- typical information density;
- brand tone and emotional goal;
- accessibility requirements;
- content and asset quality available to the team;
- implementation constraints and existing component system.

## 2. Compare the five catalog traits

Every manifest uses the same dimensions:

| Trait | Question | Values |
|---|---|---|
| Density | How much information should share a viewport? | compact, balanced, relaxed |
| Contrast | How strongly should hierarchy be separated? | low, medium, high |
| Energy | How much visual attention should the interface demand? | quiet, balanced, bold |
| Shape | What geometry should dominate? | sharp, balanced, rounded |
| Motion | How visible should interaction feedback be? | minimal, subtle, expressive |

These dimensions describe the experience more reliably than broad labels such as “modern” or “clean.”

## 3. Check fit and exclusion criteria

Read both `bestFor` and `avoidFor` in the manifest. Exclusion criteria are first-class because a visually strong style can still be operationally wrong.

For example, Neo-Brutalist is a strong candidate for an expressive developer-tool landing page, but a weak default for a dense permissions console where borders and shadows compete with the data.

## 4. Run a representative-content test

Before adopting a style, apply it to one real slice containing:

- a heading and body copy;
- primary and secondary actions;
- a form control and validation state;
- a repeated surface such as cards or table rows;
- loading, empty, error, and disabled states;
- mobile and wide-screen layouts.

Do not evaluate a style using only its hero section.

## 5. Score the candidate

Use a simple 0–2 score for each category:

| Category | 0 | 1 | 2 |
|---|---|---|---|
| Brand fit | conflicts | adaptable | naturally aligned |
| Task fit | obstructs | neutral | reinforces |
| Content fit | requires missing assets | some adaptation | works with current content |
| Accessibility | substantial remediation | manageable | strong defaults |
| Implementation | conflicts with system | adapter needed | maps directly |
| Longevity | trend-dependent | acceptable | durable visual language |

Reject a style with a zero in task fit or accessibility, even if its total score is high.

## 6. Record the decision

Capture the selected style id, version, deliberate deviations, and rejected alternatives in the consuming product. This prevents gradual drift and makes future upgrades reviewable.

## Using the catalog programmatically

`catalog.json` is deterministic and generated from every manifest. A future gallery, command-line picker, or AI retrieval layer should filter it rather than scraping Markdown.

Useful filters include:

- `status === "ready"` for production candidates;
- matching `traits.density` to the product's content load;
- intersecting `tags` with the desired brand tone;
- searching `bestFor` and excluding known `avoidFor` conflicts;
- checking `compatibleWith` only after product fit, not before it.
