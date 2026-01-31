# Neo-Brutalist Style

## Core Visual
- Hard shadows (no blur, solid offset)
- Bold dark borders (`border-2`)
- Warm cream background
- Large border radius (`rounded-xl`, `rounded-2xl`)

## Colors (HSL)
```
--primary: 24 90% 50%        /* Orange */
--background: 45 40% 96%     /* Cream */
--card: 0 0% 100%            /* White */
--border: 30 20% 15%         /* Near-black */
--secondary: 150 40% 90%     /* Mint */
--muted: 45 15% 92%          /* Warm grey */
```

## Shadows
```css
.shadow-hard { box-shadow: 4px 4px 0 0 hsl(var(--border)); }
.shadow-hard-sm { box-shadow: 2px 2px 0 0 hsl(var(--border)); }
.shadow-hard-lg { box-shadow: 8px 8px 0 0 hsl(var(--border)); }
```

## Hover
```css
.hover-lift {
  transition: transform 0.2s, box-shadow 0.2s;
}
.hover-lift:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 0 hsl(var(--border));
}
```

## Fonts
- Sans: Nunito
- Mono: Space Mono

## Patterns

**Card:**
```jsx
<div className="bg-card border-2 border-border rounded-2xl shadow-hard hover-lift p-6">
```

**Button:**
```jsx
<button className="bg-primary text-primary-foreground border-2 border-border rounded-xl shadow-hard hover-lift px-6 py-3">
```

**Icon container:**
```jsx
<div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
```
