# GPCC Reusable Components

## Scroll Section Pattern
Used in: TestimoniesScroll, MinistriesScroll (to be built)

Mobile layout (< md):
- Outer: flex-col, justify-center, gap-4, p-6
- Image panel: h-[30vh] rounded-2xl overflow-hidden (relative)
- Text panel: h-[48vh] rounded-2xl glass-panel p-6 (relative, flex flex-col justify-center)
- Pagination: absolute right-4, vertically centered, z-20
- Gap between panels: explicit gap-4, NOT justify-between

Tablet layout (md to lg):
- 2-column grid: grid-cols-2
- Image: aspect-video, rounded-2xl, object-cover
- Text: beneath image, padded, centered

Desktop layout (>= lg):
- Sticky split: left 55% image, right 40% text
- Height: N * 100vh outer

## TestimoniesScroll Reference
- File: components/home/testimonies-scroll.tsx
- getSlideTransforms() util handles opacity/scale/y for any N slides
- smoothProgress via useSpring(scrollYProgress, { stiffness: 80, damping: 26 })
- activeIndex tracked via useMotionValueEvent for pagination state

## MinistriesScroll (Sprint 2 — to be built)
- Mirror TestimoniesScroll mobile layout exactly
- Data source: MINISTRIES from @/lib/site (static array, not DB)
- Each slide: ministry.image, ministry.name, ministry.description
- Final slide: CTA slide with /images/media/MINCTA.jpg
- Mobile only — lg:hidden wrapper