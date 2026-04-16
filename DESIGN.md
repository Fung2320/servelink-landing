# Design System Specification: The Heritage Tech Aesthetic

## 1. Overview & Creative North Star
**The Creative North Star: "The Modern Griot"**
This design system rejects the "cookie-cutter" SaaS template in favor of an editorial, high-end experience that honors Cameroonian heritage through a lens of futuristic precision. We are building "The Modern Griot"—a system that tells a story of reliability, warmth, and technological mastery.

To move beyond "standard" UI, this system utilizes **Organic Asymmetry** and **Tonal Depth**. We avoid rigid, boxed-in layouts. Instead, we use expansive white space, overlapping imagery, and a "layered paper" philosophy. The interface should feel like a premium digital concierge: rooted in the deep forest greens of the littoral regions, sparked by the energy of the northern sun, and punctuated by the bold hospitality of the red star.

---

## 2. Colors: The Tonal Landscape
We have evolved the national tricolor into a sophisticated palette of **Deep Forest**, **Solar Amber**, and **Oxblood Red**.

### The "No-Line" Rule
**Borders are strictly prohibited for sectioning.** To define boundaries, you must use background color shifts (e.g., a `surface-container-low` card resting on a `surface` background). The UI must feel carved from color, not outlined by ink.

### Palette Architecture
- **Primary (Deep Forest):** `#00342a`. Used for the most prestigious elements. It represents stability and growth. Use `primary_container` (`#004d3f`) for large structural blocks to create a "monolithic" professional feel.
- **Secondary (Energetic Sun):** `#735c00`. This is our "Action Glow." Use `secondary_container` (`#fecc00`) for high-visibility wayfinding. 
- **Tertiary (Bold Accent):** `#630007`. Reserved strictly for critical CTAs and error states. This is a high-energy "Oxblood" that commands attention without feeling "cheap."

### The "Glass & Gradient" Rule
To achieve a "High-Tech" feel, floating navigation bars and modal overlays must utilize **Glassmorphism**.
- **Token:** Use `surface` with 80% opacity + 20px Backdrop Blur.
- **Signature Texture:** Apply a linear gradient from `primary` to `primary_container` (top-left to bottom-right) for Hero sections to provide a sense of "visual soul."

---

## 3. Typography: The Editorial Voice
We use a dual-typeface system to balance high-tech precision with approachable warmth.

*   **Display & Headlines (Plus Jakarta Sans):** A modern geometric sans-serif with a wide stance. It feels "architectural" and premium.
    *   *Usage:* Use `display-lg` (3.5rem) for hero greetings and `headline-md` (1.75rem) for service categories.
*   **Body & Titles (Manrope):** A highly legible, functional font that maintains a "friendly" humanist touch.
    *   *Usage:* `body-lg` (1rem) for service descriptions; `label-sm` (0.6875rem) for metadata.

**Hierarchy Note:** Always over-emphasize the scale difference between headlines and body text to maintain an editorial, high-end feel.

---

## 4. Elevation & Depth: Tonal Layering
Traditional dropshadows are clumsy. This system uses **Tonal Layering** to create a physical sense of space.

### The Layering Principle
Stacking defines priority. An interface should follow this hierarchy:
1.  **Base:** `surface` (#fcf9f8)
2.  **Sectioning:** `surface-container-low` (#f6f3f2)
3.  **Interactive Cards:** `surface-container-lowest` (#ffffff) — This creates a "soft lift."

### Ambient Shadows & Ghost Borders
- **Ambient Shadows:** When an element must "float" (e.g., a floating action button), use a 24px blur, 0px offset, and 6% opacity of the `on-surface` color.
- **The Ghost Border:** If a container requires more definition on a light background, use the `outline-variant` token at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components: Friendly & Fluid

### Buttons
- **Primary:** `primary` background with `on-primary` text. Use `xl` (1.5rem) roundedness. 
- **Secondary:** `secondary_container` background. This is for "Add to Cart" or "Book Now" actions.
- **Tertiary (Ghost):** No background. Use `primary` text weight 600.

### Cards & Lists (The "No Divider" Rule)
Forbid 1px dividers. To separate service providers in a list:
- Use **Vertical White Space**: 24px (from the spacing scale).
- Use **Alternating Surfaces**: Subtle shifts between `surface-container-low` and `surface-container-highest`.

### Input Fields
- **Background:** `surface-container-high`.
- **Shape:** `md` (0.75rem) corners.
- **State:** On focus, the "Ghost Border" becomes a 2px `primary` stroke.

### Specialized App Components
- **The Service Orb:** A large, circular `secondary_fixed` icon container for main categories (Plumbing, Electrical) to provide a "friendly, touchable" feel.
- **The Trust Badge:** A small, glassmorphic tag using `primary_fixed` to indicate verified professionals.

---

## 6. Do’s and Don’ts

### Do
- **Do** use `display-lg` typography to create "hero" moments on the home screen.
- **Do** use `primary_container` for the bottom navigation bar to anchor the app in the "Deep Forest" brand color.
- **Do** leverage the `xl` (1.5rem) roundedness for large image containers to make the "High-Tech" feel "Approachable."

### Don’t
- **Don't** use pure black (#000000). Use `on-surface` (#1b1b1b) for all text to maintain a premium, ink-like quality.
- **Don't** use standard 1px grey dividers. They clutter the UI and break the "Modern Griot" flow.
- **Don't** use the `tertiary` (Red) color for anything other than critical actions or errors. Overuse will diminish its "Bold Accent" impact.
- **Don't** use a flat grid. Offset images by 8px-12px to create an intentional, asymmetrical editorial layout.