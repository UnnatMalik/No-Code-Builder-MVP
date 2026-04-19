# Design System Strategy: The Fluid Architect

## 1. Overview & Creative North Star
The "Fluid Architect" is the creative North Star for this design system. We are moving away from the rigid, "boxed-in" feel of traditional website builders. Instead, we treat the canvas as an editorial workspace where structure is felt, not seen. 

The aesthetic is **"Soft High-Tech"**: it balances the cold precision of a no-code engine with the human-centric warmth of vibrant gradients and organic spacing. We break the "template" look by utilizing intentional asymmetry—placing oversized `display-lg` typography against minimalist `surface-container-lowest` cards. The goal is to make the user feel like they aren't just building a site; they are curating a digital masterpiece.

---

## 2. Colors & Tonal Architecture
The palette transitions from deep, authoritative purples to vibrant, energetic blues, grounded by a sophisticated neutral scale.

### The "No-Line" Rule
**Borders are a failure of hierarchy.** Within this system, 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined solely through background color shifts. To separate a feature section from a hero, transition from `surface` (#f5f7f9) to `surface-container-low` (#eef1f3). This creates a "wash" of color that guides the eye without the visual clutter of lines.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of premium materials.
- **Base Layer:** `surface` (#f5f7f9) for global backgrounds.
- **Sectional Layer:** `surface-container-low` (#eef1f3) for large content blocks.
- **Object Layer:** `surface-container-lowest` (#ffffff) for floating cards and interactive elements.
- **Interactive Layer:** `surface-bright` (#f5f7f9) for hover states on light elements.

### The "Glass & Gradient" Rule
To inject "soul" into the professional gray-scale, use **Glassmorphism**. Floating panels (like toolbars or sidebars) should use a semi-transparent `surface` color with a `backdrop-filter: blur(20px)`. 

Main CTAs must use a **Signature Gradient**: 
- **Linear Gradient:** `primary` (#4a40e0) to `secondary` (#8319da). This creates a sense of movement and depth that flat hex codes cannot replicate.

---

## 3. Typography: The Editorial Edge
We use a dual-font strategy to balance tech-forward precision with high-end editorial authority.

*   **Display & Headlines (Plus Jakarta Sans):** These are your "vibe" setters. Use `display-lg` (3.5rem) with tighter letter-spacing (-0.02em) to create a bold, authoritative presence. The geometric nature of Plus Jakarta Sans communicates "modernity."
*   **Body & UI (Inter):** Inter is the workhorse. It provides maximum legibility at smaller scales (`body-md` at 0.875rem) for complex settings and property panels.
*   **The Hierarchy Goal:** Use extreme contrast. A `display-lg` headline should often be paired with a `label-md` uppercase sub-header to create an "architectural" look.

---

## 4. Elevation & Depth
Depth is achieved through light and layering, never through heavy drop shadows.

*   **The Layering Principle:** Avoid shadows on static components. A `surface-container-lowest` card sitting on a `surface-container` background provides enough contrast to be "read" as an elevated object.
*   **Ambient Shadows:** For "floating" elements (modals, dropdowns), use the **Ambient-Soft** method:
    - `box-shadow: 0 20px 40px rgba(44, 47, 49, 0.06);` 
    - The shadow is a tinted version of `on-surface`, ensuring it looks like a natural occlusion of light rather than a "gray smudge."
*   **The "Ghost Border" Fallback:** If a border is required for accessibility (e.g., in a high-density settings panel), use the `outline-variant` token at **15% opacity**. It should be a suggestion of a line, not a boundary.

---

## 5. Components

### Buttons
*   **Primary (The Power CTA):** Uses the `primary` to `secondary` gradient. Border radius: `full`. On hover, the gradient should shift slightly in angle or scale (1.02x) to feel responsive.
*   **Secondary (The Outlined):** Uses `outline` token at low opacity with `primary` text. No solid fill.
*   **Tertiary (The Ghost):** No border, `primary` text. Use `surface-container-high` as a background on hover.

### Sleek Feature Cards
*   **Styling:** Background `surface-container-lowest` (#ffffff). Border radius: `xl` (1.5rem). 
*   **Strict Rule:** No dividers. Use `title-md` for the header and `body-md` for description, separated by `1.5rem` of vertical whitespace.

### Input Fields
*   **Neutral State:** `surface-container-high` background, no border. Radius: `md`.
*   **Focus State:** A 2px "Ghost Border" using `primary_container` (#9795ff) and a subtle 4% glow of the same color.

### Floating Builder Toolbar
*   **Contextual Component:** A glassmorphic pill (`full` radius) that floats at the bottom of the viewport. Uses `surface` with 80% opacity and `backdrop-blur`. This reinforces the "Fluid" nature of the builder.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical margins. A hero image can bleed off the right side of the grid to create a sense of infinite space.
*   **Do** use `primary-fixed-dim` for inactive icons to maintain a sophisticated, tonal look.
*   **Do** favor vertical whitespace over horizontal lines to group content.

### Don't:
*   **Don't** use pure black (#000000) for text. Use `on-background` (#2c2f31) to maintain a premium, soft-touch feel.
*   **Don't** use "Default" shadows. If you can clearly see where the shadow starts and ends, it’s too heavy.
*   **Don't** use more than one gradient-filled element in the same visual cluster; it creates "visual noise." Keep the gradient for the most important action.

### Accessibility Note:
While we utilize soft grays and low-opacity borders, always ensure that text elements maintain a 4.5:1 contrast ratio against their respective `surface-container` background. Use the `on-surface` and `primary` tokens specifically for this purpose.