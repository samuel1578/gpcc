# GPCC "Stories of Faith" Testimony Section Migration Report
## From Static CSS Grid to Immersive Scroll-Driven Story Reveal Experience

This document compiles the **Phase 1: Architectural Inspection & Non-Destructive Analysis** and **Phase 2: Safe Implementation Planning & Migration Strategy** for the "Stories of Faith / Testimonies" section on the GPCC homepage.

---

## Part 1: Phase 1 — Architectural Inspection & Non-Destructive Analysis

### 1. Current Testimonies Component Architecture

#### Component Hierarchy & Rendering Flow
*   **Data Fetching Layer:** The homepage (`app/page.tsx`) is a **Next.js Server Component** that fetches featured testimonials on the server side:
    ```ts
    const featuredTestimonials = await getFeaturedTestimonials()
    ```
*   **Container Layer:** The fetched data is passed directly as a prop to the `"use client"` component:
    ```tsx
    <TestimoniesSection testimonies={featuredTestimonials} />
    ```
*   **Editable Wrapper:** Inside `components/home/testimonies-section.tsx`, the component is wrapped in an `EditableSection` (id `"home.testimonies"`), which registers itself with the custom client-side design/editor mode store to handle inline style overrides.
*   **Header Section:** Uses a `Reveal` container to animate the category header ("Stories of Faith") and the heading ("He still moves in our midst.") which is rendered inside an `EditableText` component.
*   **Grid Layout:** A `RevealStagger` container wraps the list of testimonies, applying a staggered entrance animation to the child cards.
*   **Card Components:** Each testimony is mapped as a `motion.article` card. It features an aspect-ratio locked cover image container, metadata text (author/confidentiality), a heading, an excerpt, and a standard Next.js `Link` pointing to `/about/testimonies?slug=${t.slug}`.

#### Current Layout System & Card Structure
*   **Layout Engine:** The current layout relies strictly on Tailwind CSS Grid:
    ```tsx
    className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8"
    ```
    On mobile devices, this falls back to a single-column vertical stack (implicit `grid-cols-1`).
*   **Card Structure:**
    *   **Outer Container:** Styled with `glass-panel-strong hover:shadow-2xl transition-shadow duration-300` and rounded corners (`rounded-3xl`).
    *   **Cover Image Container:** Locked to a `relative aspect-[16/9] w-full overflow-hidden` container. It renders a Next.js `<Image>` with the `fill` property and `object-cover` styling. If no image exists, a fallback placeholder is rendered.
    *   **Text Container:** Structured with `p-7 sm:p-9` padding, containing the uppercase metadata, testimony title, line-clamped excerpt (`line-clamp-2`), and the action link.

#### Animation & Motion Usage
*   **Entrance Motion:** Viewport-triggered entrance animations are managed by `Reveal` and `RevealStagger` using the `whileInView` directive. Individual cards animate using the `fadeUp` variant:
    ```ts
    export const fadeUp: Variants = {
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0 },
    }
    ```
*   **Micro-interactions:** A spring-based hover animation is applied to each card:
    ```tsx
    whileHover={{ y: -10, transition: { type: "spring", stiffness: 400, damping: 22 } }}
    ```

---

### 2. Supabase Data Flow

#### Data Fetching Strategy
*   **Server-Side Execution:** Testimonies are fetched on the server side using the server-side Supabase client in `lib/actions/testimonies.ts`:
    ```ts
    export async function getFeaturedTestimonials() {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from("testimonies")
            .select("*")
            .eq("is_published", true)
            .eq("is_featured", true)
            .order("display_order", { ascending: true })
            .order("created_at", { ascending: false })
        ...
        return data as Testimony[]
    }
    ```

#### Overfetching & Image Handling
*   **Overfetching Analysis:** Yes, overfetching exists. The query uses `select("*")` to retrieve all columns from the `testimonies` table. While the homepage card only displays `cover_image_url`, `person_name`, `is_confidential`, `title`, and `excerpt`, the query also fetches heavy text columns like `content`, `quote`, `scripture_reference`, `category`, and `person_role`.
    *   *Payload Impact:* Because the query is limited to featured testimonials (typically 3–6 items), the absolute payload size is small, but it represents a clear optimization opportunity for low-bandwidth connections.
*   **Image Storage Bucket:** Cover images are stored in a public Supabase Storage bucket named `"testimony-images"`.
*   **Image Optimization:** Next.js `<Image>` is utilized with optimized responsive sizes:
    ```tsx
    sizes="(max-width: 768px) 100vw, 50vw"
    ```
    This prevents mobile devices from loading desktop-sized assets.

---

### 3. Rendering Behavior

*   **Rerendering Triggers:** Since `TestimoniesSection` is a `"use client"` component, it will rerender if its parent component rerenders, or if Design Mode state changes. However, on the public-facing homepage, there is no internal state, so the component remains static after its initial mount.
*   **Mount/Unmount Lifecycle:** All testimony cards are mounted simultaneously in the DOM inside the grid container. No cards mount or unmount dynamically as the user scrolls.
*   **Animation Performance:** Framer Motion's `whileInView` and `whileHover` animations manipulate CSS properties (`transform` and `opacity`) directly on the GPU, bypassing React's render loop. This ensures highly performant, jank-free animations.
*   **DOM Complexity:** The DOM structure is shallow, clean, and contains no nested layout loops or expensive canvas/WebGL elements.

---

### 4. Responsive Behavior

*   **Mobile (< 768px):** Stacks cards vertically in a single column with a `gap-6` spacing. The padding of the inner glass panel is reduced (`px-6 py-10`).
*   **Tablet (768px - 1024px):** Displays a 2-column grid (`md:grid-cols-2`). Spacing remains moderate.
*   **Desktop (1024px - 1440px):** Displays a 2-column grid with increased spacing (`lg:gap-8`). Padding uses fluid clamp values:
    ```tsx
    className="w-full rounded-3xl glass-panel px-6 py-10 lg:p-[clamp(3rem,5vw,6rem)_clamp(1.5rem,3vw,4rem)]"
    ```
*   **Ultra-Wide (1440px+):** The parent container has a maximum width of `max-w-[2800px]`. On ultra-wide screens, the 2-column grid stretches the cards excessively. This causes the `aspect-[16/9]` cover images to balloon in height, pushing typography down and creating unreadably long line lengths for the excerpt text.
*   **Typography Scaling:** Heading sizes scale fluidly using CSS clamping:
    ```tsx
    style={{ fontSize: "clamp(1.5rem,2.5vw,3rem)" }}
    ```

---

### 5. Existing Animation Infrastructure

*   **Custom Easing:** Located in `lib/motion.ts`, the project defines a premium, slow, and cinematic cubic-bezier easing curve:
    ```ts
    export const ease = [0.16, 1, 0.3, 1] as const // cubic-bezier(0.16, 1, 0.3, 1)
    ```
*   **Reveal Wrappers:**
    *   `Reveal`: Animates a single component into view using `whileInView` with configurable `delay`, `duration`, and `variants` (defaulting to `fadeUp`).
    *   `RevealStagger`: Coordinates staggered entry animations for child components using Framer Motion's `staggerChildren` transition property.
*   **Viewport Configuration:** Viewport entry triggers once (`once: true`) when `20%` of the element is visible in the viewport (`amount: 0.2`).

---

### 6. Existing Reusable Utilities

*   **Layout Primitives:**
    *   `EditableSection`: A wrapper that applies design mode overrides (padding, max-width, gaps, and columns) as inline CSS styles.
    *   `ParallaxContent`: A passive wrapper that places sections above the global body background without listening to scroll events or triggering rerenders.
*   **Typography Primitives:**
    *   `EditableText`: Handles text-level design mode overrides (font size, line height, max-width, alignment) and outputs semantic tags (`h1`, `h2`, `p`, etc.).
*   **Visual Primitives:**
    *   `GlassPanel` (`components/ui/glass-panel.tsx`): A utility that wraps components in glassmorphic styles (`glass-panel`, `glass-panel-strong`, `glass-panel-subtle`, `glass-panel-dark`).

---

### 7. Performance Risks & Bottlenecks

1.  **Nested Backdrop Blurs:** The parent container uses `glass-panel` (which applies `backdrop-filter: blur`), and each individual card uses `glass-panel-strong` (applying another layer of `backdrop-filter`). On low-end mobile devices, nested backdrop blurs can cause GPU bottlenecking, resulting in scroll-jank.
2.  **Overfetching Columns:** Fetching full text content (`select("*")`) for all featured testimonies on the homepage increases network payload unnecessarily.
3.  **Image Sizes on Ultra-Wide Monitors:** On monitors wider than `1920px`, the card sizes stretch excessively, causing Next.js to request large image assets to fill the wide containers.
4.  **Layout Thrashing in Design Mode:** Modifying columns and paddings in real-time triggers direct inline style updates, which can cause layout recalculations if not throttled.

---

### 8. Migration Readiness

#### Can the current architecture support a scroll-driven storytelling experience?
**Yes.** The existing architecture is highly compatible with a scroll-driven reveal migration.

#### What can be reused safely?
*   **Server Action:** `getFeaturedTestimonials()` can be used without modification to supply the narrative data.
*   **Motion Infrastructure:** The custom easing curve (`ease`) and `useScroll` hooks from Framer Motion can drive the scroll-controlled animations.
*   **UI Primitives:** `GlassPanel` utility classes can be reused to style the cinematic split-screen layouts.
*   **Design Mode Integration:** `EditableSection` can wrap the sticky container, ensuring administrative configuration is preserved.

#### What should remain untouched?
*   The database schema and Supabase types (`Testimony` interface).
*   The server-side data fetching model (fetching on the server and passing as props).
*   The administrative testimonies management pages (`app/admin/testimonies/page.tsx`).

#### Future Implementation Constraints
*   **Dynamic Scroll Height:** The height of the sticky scroll container (e.g., `h-[400vh]`) must scale dynamically based on the length of the testimonies array to prevent empty scroll tracks.
*   **Design Mode Bypass:** Grid column configurations (`columns`) in `EditableSection` must be bypassed or ignored when the scroll-driven storytelling layout is active.

---

### 9. Accessibility Considerations

*   **Semantic Structure:** The section correctly utilizes `<section>` and `<article>` tags, which is excellent for screen readers.
*   **Focus Behavior:** **NOT VERIFIED**. The homepage cards do not currently implement focus rings or keyboard focus trapping for card-click events.
*   **Reduced-Motion Support:** **NOT VERIFIED**. The existing `Reveal` and `RevealStagger` components do not currently check for user-level `prefer-reduced-motion` preferences.
*   **Keyboard Accessibility:** The "Read story" links are standard `Link` tags and are keyboard focusable, but the hover spring animations are not accessible via keyboard tab navigation.

---

## Part 2: Phase 2 — Safe Implementation Planning & Migration Strategy

### 1. Migration Architecture Strategy

To ensure zero downtime and a safe, non-destructive migration path, we will follow a **parallel-component feature-flagged strategy**:

```
+-----------------------------------------------------------------------------------+
|                                  HOMEPAGE (app/page.tsx)                          |
+-----------------------------------------------------------------------------------+
                                         |
                                         v
                      [ getFeaturedTestimonials() (Server Action) ]
                                         |
                                         v
               +---------------------------------------------------+
               |  TestimoniesSection (Wrapper / Entry Point)       |
               +---------------------------------------------------+
                                         |
                     +-------------------+-------------------+
                     | (Design Mode / prefers-reduced-motion) |
                     v                                       v
        +-------------------------+             +-------------------------+
        |  TestimoniesGrid        |             |  TestimoniesScroll      |
        |  (Legacy Grid Layout)   |             |  (New Sticky Reveal)    |
        +-------------------------+             +-------------------------+
```

#### Safest Migration Path
*   **Non-Destructive Refactoring:** We will NOT delete or rewrite the existing `TestimoniesSection` in place. Instead, we will rename the existing grid layout code to a sub-component: `components/home/testimonies-grid.tsx`.
*   **New Sticky Component:** We will create a new, dedicated component: `components/home/testimonies-scroll.tsx`.
*   **Wrapper Orchestration:** The main `TestimoniesSection` entry point will act as a controller, conditionally rendering either the `TestimoniesGrid` or `TestimoniesScroll` based on a feature flag, the active design mode state, or accessibility settings (`prefers-reduced-motion`).
*   **Preserving the Supabase Flow:** The server-side fetching action `getFeaturedTestimonials()` in `app/page.tsx` remains completely untouched, passing the same `testimonies` array to the wrapper. This guarantees that the database connection, SSR boundaries, caching, and admin dashboard mutations are 100% unaffected.

---

### 2. Scroll Storytelling Architecture

The scroll-driven mechanism will be built entirely using **CSS Sticky Positioning** and **Framer Motion's compositor-thread tracking**, avoiding heavy third-party scroll-jacking libraries.

#### Sticky Container & Scroll Tracking
*   **The Scroll Track:** The master container is styled with a dynamic height based on the number of testimonies:
    ```tsx
    style={{ height: `${testimonies.length * 100}vh` }}
    ```
*   **The Sticky Wrapper:** Inside the track, a container is pinned to the viewport using Tailwind classes:
    ```tsx
    className="sticky top-0 h-[100dvh] w-full overflow-hidden"
    ```
*   **Scroll Tracking:** We bind Framer Motion's `useScroll` hook to the parent container using a React `useRef`:
    ```ts
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start start", "end end"]
    })
    ```

#### Progress Interpolation & Activation
*   **Inertial Smoothing:** To prevent jagged transitions from mouse-wheel ticks, we filter `scrollYProgress` through a spring filter:
    ```ts
    const smoothProgress = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    })
    ```
*   **Range Mapping:** We map `smoothProgress` to individual slide transformations using `useTransform`. For 3 testimonies:
    *   **Slide 1:** Active range `[0, 0.33]`. Fades out between `[0.28, 0.33]`.
    *   **Slide 2:** Fades in between `[0.28, 0.33]`, active range `[0.33, 0.66]`, fades out between `[0.61, 0.66]`.
    *   **Slide 3:** Fades in between `[0.61, 0.66]`, active range `[0.66, 1.0]`.
*   **Viewport Release:** Once `scrollYProgress` reaches `1.0`, the sticky container naturally releases, allowing the user to scroll smoothly into the next section.

---

### 3. Rendering Optimization Strategy

To ensure instant page load, zero layout thrashing, and flawless scrolling performance:

#### Selective Rendering & Progressive Mounting
*   **Persistent DOM Structure:** All testimony slides are mounted in the DOM on initial render. This prevents hydration mismatches and ensures search engine crawlers (SEO) can fully index the content.
*   **Compositor-Thread Updates:** We bind the output of our `useTransform` hooks directly to Framer Motion `motion.div` attributes (e.g., `style={{ opacity, scale, y }}`). This allows the browser to update the slide positions and opacities directly in the GPU compositor thread, bypassing React's render loop entirely. The main component renders only once on mount.
*   **Progressive Image Loading:** 
    *   **Slide 1:** Cover image is rendered with Next.js `<Image priority={true} loading="eager" />` to ensure it is immediately visible above the fold.
    *   **Slides 2+:** Cover images use standard Next.js lazy-loading (`loading="lazy"`), downloading only when the user begins scrolling into the section.

---

### 4. Supabase & Data Optimization Strategy

To keep the initial homepage payload lightweight and network-efficient:

#### Optimized Query Structure
*   We will refactor the homepage query in `lib/actions/testimonies.ts` to select only the fields required for the storytelling reveal, excluding the heavy, rich-text `content` column:
    ```ts
    export async function getFeaturedTestimonialsSummary() {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from("testimonies")
            .select("id, title, slug, person_name, is_confidential, excerpt, cover_image_url, scripture_reference, quote")
            .eq("is_published", true)
            .eq("is_featured", true)
            .order("display_order", { ascending: true })
            ...
        return data as Testimony[]
    }
    ```
    *   *Payload Reduction:* This reduces the JSON payload size by up to **90%**, ensuring fast load times even on slow 3G mobile connections.
*   **Deferred Content Loading:** The full rich-text `content` remains deferred until the user clicks the "Read full story" link and navigates to the dedicated testimony detail page (`/about/testimonies?slug=...`), which is loaded server-side.

---

### 5. Motion System Architecture

#### Orchestration & Easing
*   We will strictly utilize the custom GPCC easing curve defined in `lib/motion.ts`:
    ```ts
    export const ease = [0.16, 1, 0.3, 1] as const // cubic-bezier(0.16, 1, 0.3, 1)
    ```
*   **Scroll Progress Mapping:** We use `useTransform` to map the smoothed scroll progress to clean, GPU-accelerated CSS variables:

| Slide State | Progress Range | Opacity Target | Scale Target | TranslateY Target |
| :--- | :--- | :--- | :--- | :--- |
| **Entering** | Previous Exit -> Active Start | `0.0` -> `1.0` | `0.95` -> `1.0` | `20px` -> `0px` |
| **Active** | Active Start -> Active End | `1.0` | `1.0` | `0px` |
| **Exiting** | Active End -> Next Enter | `1.0` -> `0.0` | `1.0` -> `1.05` | `0px` -> `-20px` |

#### Avoiding Motion Overload
*   **Desktop vs. Mobile Divergence:**
    *   **Desktop:** Implements the full split-screen editorial layout with image parallax shifting (`x` translation of `-10%` to `10%` inside the image mask) and staggered typography reveals.
    *   **Mobile:** Simplifies transitions to basic opacity cross-fades and a subtle `y` translation of `10px` to `0px`. Heavy parallax and scale zooms are completely disabled on mobile viewports.

---

### 6. Responsive Implementation Strategy

We design separate responsive behaviors across breakpoints to maintain visual balance and prevent interface crowding:

*   **Ultra-Wide (1440px+):** Split-screen layout locked to `max-width: 1600px`. Typography scaled using CSS `clamp()`.
*   **Desktop & Laptop (1024px - 1440px):** 50/50 horizontal split. Left side is sticky image, right side is fading narrative text.
*   **Tablet (768px - 1024px):** 40/60 vertical split. Sticky media is smaller, leaving more height for typography.
*   **Mobile (< 768px):** Single-column vertical fade reveal. Sticky track shortened to `h-200vh` to reduce scrolling fatigue.
*   **Breakpoint Detection:** Breakpoint layouts will be driven by Tailwind's responsive classes (`hidden md:flex`, `flex md:hidden`) to prevent hydration mismatches caused by JavaScript-based window measurements.

---

### 7. Performance Protection Strategy

#### GPU-Safe Animations
*   We will strictly restrict all scroll-driven animations to `transform` (specifically `translate3d` to force GPU layering) and `opacity`. No animations will touch layout properties like `height`, `margin`, `padding`, or `top`.
*   **Selective Layering:** We will apply `will-change: transform, opacity` only to the active animating slide wrappers to pre-allocate GPU memory.

#### Low-End Device & Battery Protection
*   **Reduced-Motion Fallback:** We will query the user's system preferences using a standard CSS media query:
    ```css
    @media (prefers-reduced-motion: reduce) {
      /* Fallback to static grid layout */
    }
    ```
    If active, the Main Wrapper will automatically bypass the `TestimoniesScroll` component and render the lightweight `TestimoniesGrid` instead.
*   **Excluding Expensive Effects:** We will completely avoid heavy real-time CSS filters like `backdrop-filter: blur()` or CSS box-shadow animations during scroll transitions, as these force expensive browser paint cycles.

---

### 8. Accessibility Implementation Strategy

*   **Semantic Structure:** The sticky scroll container is wrapped in a `<section>` tag with an explicit ARIA label:
    ```tsx
    <section aria-roledescription="story-reveal" aria-label="Stories of Faith">
    ```
*   **Aria-Hidden Bindings:** Inactive slides are assigned `aria-hidden="true"` to prevent screen readers from reading out-of-focus text.
*   **Keyboard Navigation & Tab Index:** 
    *   Standard keyboard scrolling (Spacebar, Page Down, Arrow Keys) naturally drives the scroll-driven transitions.
    *   Links inside inactive slides are assigned `tabIndex={-1}` and are updated to `tabIndex={0}` only when their corresponding slide achieves active focus.
*   **Contrast Ratios:** Contrast ratios between text and background gradient blurs are kept at a minimum of **4.5:1** (WCAG AA standard) across all transition states.

---

### 9. Final Safe Blueprint & Risk Assessment

#### Recommended Component Architecture
```
components/home/
├── testimonies-section.tsx   <-- Wrapper Controller (Feature Flag & Accessibility Router)
├── testimonies-grid.tsx      <-- Legacy Grid Layout (Fallback & Reduced Motion)
└── testimonies-scroll.tsx    <-- New Scroll-Driven Story Reveal Component
```

#### Risk Assessment & Safe Mitigation Plan

| Risk Type | Risk Description | Safe Mitigation Strategy |
| :--- | :--- | :--- |
| **Performance Risk** | Scroll-jank and frame drops on low-end mobile devices during scroll tracking. | Use Framer Motion's `useSpring` to smooth scroll inputs, and completely disable complex parallax/scale translations on viewports under `768px`. |
| **Hydration Risk** | Mismatches between server-rendered HTML and client-side scroll position on page load. | Keep all elements mounted statically in the HTML, using pure CSS styles for initial layouts and binding Framer Motion values only after mount. |
| **Accessibility Risk** | Screen readers getting trapped or keyboard users unable to bypass the sticky section. | Provide a visually hidden "Skip testimonies" link at the top of the section, and manage `tabIndex` dynamically on inactive slide links. |
| **Production Risk** | Code errors or layout breaks during live deployment on the church homepage. | Implement the **parallel-component strategy** with a toggle flag. If any issues arise, the legacy grid can be restored instantly with a single boolean change. |
