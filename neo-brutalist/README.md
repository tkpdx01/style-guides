# Neo-Brutalist Landing Page Style Guide

> A warm, handcrafted design system for building modern landing pages with hard shadows and cozy aesthetics.

---

## Examples

![Neo-Brutalist Example - hapi.run](./assets/example-1.png)

---

## Table of Contents

- [1. Overview](#1-overview)
- [2. Tech Stack](#2-tech-stack)
- [3. Installation](#3-installation)
- [4. Tailwind Configuration](#4-tailwind-configuration)
- [5. CSS Variables & Themes](#5-css-variables--themes)
  - [5.1 Light Theme](#51-light-theme)
  - [5.2 Dark Theme](#52-dark-theme)
- [6. Global Styles](#6-global-styles)
- [7. Utility Classes](#7-utility-classes)
  - [7.1 Hard Shadows](#71-hard-shadows)
  - [7.2 Hover Effects](#72-hover-effects)
- [8. Typography](#8-typography)
- [9. Utils Function](#9-utils-function)
- [10. Design Principles](#10-design-principles)
- [11. Common Patterns](#11-common-patterns)

---

## 1. Overview

This style guide defines a **Neo-Brutalist** design system characterized by:

- **Hard shadows** instead of soft drop shadows
- **Bold, dark borders** on light backgrounds
- **Warm, creamy color palette**
- **Playful, rounded typography**
- **Interactive hover animations**

The aesthetic is inspired by modern SaaS landing pages that feel handcrafted and approachable.

---

## 2. Tech Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| Framework | Next.js (App Router) | 15.x | React framework |
| Styling | Tailwind CSS | ^3.4.19 | Utility-first CSS |
| Animation | Framer Motion | ^12.29.2 | Smooth animations |
| Icons | Lucide React | ^0.563.0 | Icon library |
| Components | Radix UI | various | Headless UI primitives |
| Class Utils | clsx | ^2.1.1 | Conditional classes |
| Class Merge | tailwind-merge | ^3.4.0 | Merge Tailwind classes |
| Variants | class-variance-authority | ^0.7.1 | Component variants |

---

## 3. Installation

```bash
# Core dependencies
npm install tailwindcss postcss autoprefixer

# Utility libraries
npm install clsx tailwind-merge class-variance-authority

# Animation & Icons
npm install framer-motion lucide-react

# Fonts
npm install @fontsource/nunito @fontsource/space-mono

# Radix UI components (install as needed)
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tabs
```

Import fonts in your entry file:

```typescript
// app/layout.tsx or main.tsx
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";
import "@fontsource/nunito/800.css";
import "@fontsource/space-mono/400.css";
import "@fontsource/space-mono/700.css";
```

---

## 4. Tailwind Configuration

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Nunito", "system-ui", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
    },
  },
  plugins: [],
}
```

---

## 5. CSS Variables & Themes

### 5.1 Light Theme

```css
:root {
  /* Primary - Warm Orange */
  --primary: 24 90% 50%;
  --primary-foreground: 0 0% 100%;

  /* Background - Creamy/Warm White */
  --background: 45 40% 96%;
  --foreground: 30 20% 10%;

  /* Card - Pure White */
  --card: 0 0% 100%;
  --card-foreground: 30 20% 10%;

  /* Popover */
  --popover: 0 0% 100%;
  --popover-foreground: 30 20% 10%;

  /* Secondary - Mint Green */
  --secondary: 150 40% 90%;
  --secondary-foreground: 150 30% 20%;

  /* Muted - Warm Grey */
  --muted: 45 15% 92%;
  --muted-foreground: 30 15% 40%;

  /* Accent - Soft Purple */
  --accent: 300 25% 92%;
  --accent-foreground: 300 35% 25%;

  /* Destructive - Red */
  --destructive: 0 80% 55%;
  --destructive-foreground: 0 0% 100%;

  /* Border - DARK (Neo-Brutalist key!) */
  --border: 30 20% 15%;
  --input: 30 20% 15%;
  --ring: 24 90% 50%;

  /* Border Radius */
  --radius: 1rem;
}
```

### 5.2 Dark Theme

```css
.dark {
  /* Primary - Emerald Green */
  --primary: 145 70% 45%;
  --primary-foreground: 145 30% 10%;

  /* Background - Deep Purple */
  --background: 260 30% 8%;
  --foreground: 260 10% 92%;

  /* Card */
  --card: 260 30% 10%;
  --card-foreground: 260 10% 92%;

  /* Popover */
  --popover: 260 30% 10%;
  --popover-foreground: 260 10% 92%;

  /* Secondary */
  --secondary: 260 20% 18%;
  --secondary-foreground: 260 10% 92%;

  /* Muted */
  --muted: 260 20% 15%;
  --muted-foreground: 260 15% 55%;

  /* Accent */
  --accent: 260 20% 18%;
  --accent-foreground: 260 10% 92%;

  /* Destructive */
  --destructive: 0 70% 55%;
  --destructive-foreground: 0 0% 100%;

  /* Border */
  --border: 260 20% 25%;
  --input: 260 20% 25%;
  --ring: 145 70% 45%;
}
```

---

## 6. Global Styles

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased;
    margin: 0;
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-bold tracking-tight;
  }
}
```

---

## 7. Utility Classes

### 7.1 Hard Shadows

The signature Neo-Brutalist effect - solid color shadows with no blur.

```css
@layer components {
  /* Small shadow - 2px offset */
  .shadow-hard-sm {
    box-shadow: 2px 2px 0px 0px hsl(var(--border));
  }

  /* Default shadow - 4px offset */
  .shadow-hard {
    box-shadow: 4px 4px 0px 0px hsl(var(--border));
  }

  /* Large shadow - 8px offset */
  .shadow-hard-lg {
    box-shadow: 8px 8px 0px 0px hsl(var(--border));
  }
}
```

**Usage:**

```jsx
<div className="bg-card border-2 border-border rounded-xl shadow-hard p-6">
  Card content
</div>
```

### 7.2 Hover Effects

Interactive lift effect on hover.

```css
@layer components {
  .hover-lift {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .hover-lift:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0px 0px hsl(var(--border));
  }
}
```

**Usage:**

```jsx
<button className="bg-primary text-primary-foreground border-2 border-border rounded-lg shadow-hard hover-lift px-6 py-3">
  Click me
</button>
```

---

## 8. Typography

| Element | Classes | Description |
|---------|---------|-------------|
| H1 | `text-4xl lg:text-6xl font-bold` | Hero headlines |
| H2 | `text-3xl lg:text-4xl font-bold` | Section titles |
| H3 | `text-xl lg:text-2xl font-semibold` | Card titles |
| Body | `text-base font-normal` | Paragraph text |
| Small | `text-sm text-muted-foreground` | Secondary text |
| Mono | `font-mono text-sm` | Code, numbers |

**Font Stack:**

- **Sans (Primary):** Nunito - Rounded, friendly, highly readable
- **Mono:** Space Mono - Technical, retro feel

---

## 9. Utils Function

Essential utility for merging Tailwind classes safely.

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage:**

```tsx
import { cn } from "@/lib/utils"

function Button({ className, variant, ...props }) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg border-2 border-border shadow-hard",
        variant === "primary" && "bg-primary text-primary-foreground",
        variant === "secondary" && "bg-secondary text-secondary-foreground",
        className
      )}
      {...props}
    />
  )
}
```

---

## 10. Design Principles

### Core Visual Elements

| Element | Implementation |
|---------|----------------|
| **Hard Shadows** | `shadow-hard`, `shadow-hard-lg` - No blur, solid offset |
| **Bold Borders** | `border-2 border-border` - Dark, visible borders |
| **Large Radius** | `rounded-xl`, `rounded-2xl` - Soft, friendly corners |
| **Warm Background** | `bg-background` - Creamy white, not pure white |
| **High Contrast** | Dark borders on light cards create visual pop |

### Color Psychology

- **Orange Primary:** Energy, creativity, warmth
- **Mint Secondary:** Fresh, calm, trustworthy
- **Cream Background:** Cozy, approachable, less sterile than white
- **Dark Borders:** Grounding, definition, handcrafted feel

### Animation Guidelines

```tsx
// Framer Motion presets
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}
```

---

## 11. Common Patterns

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

### Feature Card

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
  <div className="text-4xl font-bold font-mono text-primary mb-2">
    1,234
  </div>
  <div className="text-sm text-muted-foreground">
    Metric Label
  </div>
</div>
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

---

## Quick Reference

```
Shadows:     shadow-hard-sm | shadow-hard | shadow-hard-lg
Borders:     border-2 border-border
Radius:      rounded-sm | rounded-md | rounded-lg | rounded-xl | rounded-2xl
Hover:       hover-lift
Colors:      bg-background | bg-card | bg-primary | bg-secondary | bg-muted | bg-accent
Text:        text-foreground | text-muted-foreground | text-primary | text-secondary-foreground
Fonts:       font-sans (Nunito) | font-mono (Space Mono)
```

---

*Style Guide Version: 1.0*
*Design System: Neo-Brutalist / Cozy Maker Workshop*
