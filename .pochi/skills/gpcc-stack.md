---
name: gpcc-stack
description: GPCC tech stack, breakpoints and core rules for Next.js project
---

# GPCC Tech Stack

- Framework: Next.js App Router (TypeScript)
- Styling: Tailwind CSS v4
- Animation: Framer Motion + GSAP
- UI Primitives: Radix UI
- Components: Custom design system
- Deployment: Vercel

## Breakpoints
- Mobile: < 768px (md)
- Tablet/iPad: 768px–1023px (md to lg)
- Desktop: >= 1024px (lg)

## Key Rules
- Mobile-first Tailwind classes
- Hamburger nav must show at md AND below (not just sm)
- Sticky scroll sections use `height: Nvh` outer + `sticky top-0 h-[100dvh]` inner
- Never use px viewport units for height on mobile — always dvh