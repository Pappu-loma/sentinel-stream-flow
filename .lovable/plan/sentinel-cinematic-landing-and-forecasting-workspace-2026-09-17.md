# Sentinel cinematic landing and forecasting workspace

## What I’ll build

- A cinematic `/` landing page in strict monochrome chrome, centered on an original liquid-metal humanoid mascot.
- Scroll-linked visual progression through multiple mascot poses, spacious narrative sections, and a polished entrance into the product.
- A separate `/app` forecasting workspace with a fixed history sidebar, fixed mode bar, scrollable analysis thread, expandable details, monochrome chart, and fixed chat composer.
- Responsive layouts that preserve the cinematic landing page and turn the workspace sidebar into a compact mobile control.

## Visual direction

- Deep black and charcoal foundations; silver, white, and gunmetal materials only.
- High-contrast modern sans typography with wide editorial spacing.
- Brushed-metal surfaces, reflective edges, inner highlights, and restrained depth instead of flat gray panels.
- Liquid hover distortion and subtle scroll/reveal motion, with reduced-motion support.
- Three cohesive generated mascot images: a commanding hero pose and two evolving analytical/forward-motion poses.

## Product behavior

- Landing page navigation and closing call-to-action open the app workspace.
- Forecast modes are selectable and update the active state.
- History rows, accordions, and the chat composer are interactive.
- Submitting a prompt appends it to the analysis conversation with a brief simulated response state.
- Forecast numbers and charts use neutral styling and explicit text labels rather than red/green color semantics.

## Technical details

- Build on the existing TanStack Start structure with route-specific metadata for `/` and `/app`.
- Install and compose the required AI Elements conversation, message, prompt-input, and shimmer primitives for the chat surface.
- Use semantic OKLCH tokens in the shared design system; no hardcoded component colors.
- Use CSS scroll timelines where supported with a graceful static fallback.
- Verify compilation, interactions, and desktop/mobile rendering in the live preview.
