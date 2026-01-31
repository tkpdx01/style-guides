# Style Guides

> Frontend style guides for AI-assisted development.

---

## Styles Index

| ID | Name | Path | Tags | Best For |
|----|------|------|------|----------|
| `neo-brutalist` | Neo-Brutalist | [neo-brutalist/README.md](./neo-brutalist/README.md) | `warm`, `handcrafted`, `hard-shadows`, `bold-borders`, `playful` | Landing pages, SaaS, Creative portfolios |

---

## Quick Reference

### neo-brutalist

<a href="./neo-brutalist/README.md"><img src="./neo-brutalist/assets/example-1.png" width="400" alt="Neo-Brutalist Example"></a>

**Visual:** Hard shadows, bold dark borders, warm creamy backgrounds, rounded typography

**Stack:** Tailwind CSS, Framer Motion, Radix UI, Nunito + Space Mono

**Key Classes:**
- `shadow-hard` / `shadow-hard-lg` - Solid offset shadows
- `hover-lift` - Interactive lift on hover
- `border-2 border-border` - Bold dark borders
- `rounded-xl` / `rounded-2xl` - Large border radius

**Colors:**
- Primary: `hsl(24 90% 50%)` (Orange)
- Background: `hsl(45 40% 96%)` (Cream)
- Border: `hsl(30 20% 15%)` (Near-black)

---

## Usage

```
"Apply the neo-brutalist style from style-guides/neo-brutalist/README.md"
```

---

## Structure

```
style-guides/
├── README.md              # This index
├── neo-brutalist/
│   └── README.md          # Full guide
└── [future-style]/
    └── README.md
```

---

## Adding New Styles

1. Create directory: `style-name/`
2. Add `README.md` with: Tech stack, CSS variables, Tailwind config, utility classes, common patterns
3. Update this index
