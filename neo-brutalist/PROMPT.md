# Neo-Brutalist Style (AI Prompt)

## Core Visual
- Hard shadows (no blur, solid offset)
- Bold dark borders (`border-2 border-border`)
- Warm cream background
- Large border radius (`rounded-xl`, `rounded-2xl`)
- Interactive hover lift effect

## Colors (HSL format, use with `hsl(var(--name))`)
```css
:root {
  --primary: 24 90% 50%;           /* Orange */
  --primary-foreground: 0 0% 100%;
  --background: 45 40% 96%;        /* Cream */
  --foreground: 30 20% 10%;
  --card: 0 0% 100%;               /* White */
  --card-foreground: 30 20% 10%;
  --secondary: 150 40% 90%;        /* Mint */
  --secondary-foreground: 150 30% 20%;
  --muted: 45 15% 92%;             /* Warm grey */
  --muted-foreground: 30 15% 40%;
  --accent: 300 25% 92%;           /* Soft purple */
  --accent-foreground: 300 35% 25%;
  --destructive: 0 80% 55%;
  --destructive-foreground: 0 0% 100%;
  --border: 30 20% 15%;            /* Near-black - KEY! */
  --input: 30 20% 15%;
  --ring: 24 90% 50%;
  --radius: 1rem;
}
```

## Tailwind Config Essentials
```js
colors: {
  border: "hsl(var(--border))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
  secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
  muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
  accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
  card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
},
fontFamily: {
  sans: ["Nunito", "system-ui", "sans-serif"],
  mono: ["Space Mono", "monospace"],
},
```

## Custom Utilities (add to globals.css)
```css
@layer components {
  .shadow-hard-sm { box-shadow: 2px 2px 0 0 hsl(var(--border)); }
  .shadow-hard { box-shadow: 4px 4px 0 0 hsl(var(--border)); }
  .shadow-hard-lg { box-shadow: 8px 8px 0 0 hsl(var(--border)); }

  .hover-lift {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .hover-lift:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 0 hsl(var(--border));
  }
}
```

## Typography
| Element | Classes |
|---------|---------|
| H1 | `text-4xl lg:text-6xl font-bold` |
| H2 | `text-3xl lg:text-4xl font-bold` |
| H3 | `text-xl lg:text-2xl font-semibold` |
| Body | `text-base` |
| Small | `text-sm text-muted-foreground` |
| Mono | `font-mono text-sm` |

## Component Patterns

### Button (Primary)
```jsx
<button className="bg-primary text-primary-foreground border-2 border-border rounded-xl shadow-hard hover-lift px-6 py-3 font-semibold">
  Button Text
</button>
```

### Button (Secondary)
```jsx
<button className="bg-secondary text-secondary-foreground border-2 border-border rounded-xl shadow-hard hover-lift px-6 py-3 font-semibold">
  Button Text
</button>
```

### Card
```jsx
<div className="bg-card border-2 border-border rounded-2xl shadow-hard hover-lift p-6">
  <h3 className="text-xl font-semibold mb-2">Card Title</h3>
  <p className="text-muted-foreground">Card content here.</p>
</div>
```

### Feature Card (with icon)
```jsx
<div className="bg-card border-2 border-border rounded-2xl shadow-hard hover-lift p-6">
  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4">
    <Icon className="w-6 h-6 text-secondary-foreground" />
  </div>
  <h3 className="text-xl font-semibold mb-2">Feature Title</h3>
  <p className="text-muted-foreground">Feature description goes here.</p>
</div>
```

### Stats Card
```jsx
<div className="bg-card border-2 border-border rounded-xl shadow-hard p-6 text-center">
  <div className="text-4xl font-bold font-mono text-primary mb-2">1,234</div>
  <div className="text-sm text-muted-foreground">Metric Label</div>
</div>
```

### Hero Section
```jsx
<section className="py-20 lg:py-32">
  <div className="container mx-auto px-4">
    <h1 className="text-4xl lg:text-6xl font-bold text-center mb-6">
      Your Headline Here
    </h1>
    <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-10">
      Supporting description text
    </p>
    <div className="flex justify-center gap-4">
      <button className="bg-primary text-primary-foreground border-2 border-border rounded-xl shadow-hard hover-lift px-8 py-4 font-semibold">
        Get Started
      </button>
    </div>
  </div>
</section>
```

### CTA Section
```jsx
<section className="py-20 bg-primary/10">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl lg:text-4xl font-bold mb-6">
      Ready to get started?
    </h2>
    <button className="bg-primary text-primary-foreground border-2 border-border rounded-xl shadow-hard-lg hover-lift px-10 py-5 text-lg font-semibold">
      Start Free Trial
    </button>
  </div>
</section>
```

### Input Field
```jsx
<input
  type="text"
  className="w-full px-4 py-3 bg-card border-2 border-border rounded-xl shadow-hard-sm focus:outline-none focus:ring-2 focus:ring-ring"
  placeholder="Enter text..."
/>
```

### Badge
```jsx
<span className="inline-flex items-center px-3 py-1 bg-secondary text-secondary-foreground border-2 border-border rounded-full text-sm font-medium shadow-hard-sm">
  Badge
</span>
```

## Animation (Framer Motion)
```tsx
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerChildren = {
  animate: { transition: { staggerChildren: 0.1 } }
}
```

## Quick Reference
```
Shadows:  shadow-hard-sm | shadow-hard | shadow-hard-lg
Borders:  border-2 border-border
Radius:   rounded-sm | rounded-md | rounded-lg | rounded-xl | rounded-2xl
Hover:    hover-lift
BG:       bg-background | bg-card | bg-primary | bg-secondary | bg-muted
Text:     text-foreground | text-muted-foreground | text-primary-foreground
Fonts:    font-sans (Nunito) | font-mono (Space Mono)
```
