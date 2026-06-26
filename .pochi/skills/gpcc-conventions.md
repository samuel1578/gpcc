# GPCC Code Conventions

## Component Structure
- All interactive components are "use client"
- Layout wrappers use <PageContainer> from @/components/layout/page-container
- Editable sections use <EditableSection> and <EditableText> from @/components/design-mode/editable
- Scroll-driven animations use useScroll + useSpring + useTransform from framer-motion

## Animation Pattern (Scroll-Driven)
- Outer div: relative, height = N * 100vh (N = number of slides)
- Inner div: sticky top-0 h-[100dvh] overflow-hidden
- Per-slide transforms via getSlideTransforms(progress, index, count, device)
- Device = "desktop" | "mobile" — desktop gets scale+y, mobile gets y only

## Z-index Scale
- Base content: z-10
- Sticky panels: z-10
- Pagination/indicators: z-20
- Modals/overlays: z-50
- Always add isolation-isolate to modal trigger parents

## Class Tokens
- glass-panel, glass-panel-strong, glass-panel-subtle
- h-section (heading size clamp)
- body-lg (body size clamp)
- label-cap (uppercase tracking label)
- text-ink, text-ink-muted (semantic text colors)
- accent: var(--accent-deep)