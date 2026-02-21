# Responsive Fullwidth Video Carousel
**UI Landing Page Study**

A recreation of the UI from the official website of [JYPE Entertainment](https://www.jype.com/#), focused specifically on the full-width responsive video carousel featured on the landing page.

### Original Design (February 2026)

- Desktop Version

![original desktop design for comparison](./assets/original-design/jyp-desktop.gif)

- Mobile Version

![original mobile design for comparison](./assets/original-design/jpy-mobile.gif)


## Features Replicated

These were the key interactions and design elements that stood out to me and that I aimed to reproduce as accurately as possible:

1. Infinite Loop Carousel

In the original design, the carousel loops seamlessly. Instead of visibly “jumping” from the last slide back to the first (or vice versa), the transition appears continuous and fluid.

To replicate this behavior, I implemented a cloning technique:

- A clone of the last slide is placed at the beginning.

- A clone of the first slide is placed at the end.

- The carousel initially starts on the "real first" slide, which is the one actually placed in *second* position.

- When transitioning past the real last (or first) slide, the carousel instantly resets to the corresponding slide — without a visible jump.

Because this reset happens without animation, the user perceives a perfectly smooth infinite loop.

2. Custom Cursor on Hover (Desktop)

On desktop the left third of the screen acts as a “Previous” zone, while the right third acts as a “Next” zone.

When hovering over either side, a custom cursor appears. The cursor is styled as a pill-shaped button displaying either “PREV” or “NEXT,” reinforcing the interactive area.

3. Drag Navigation (Mobile)

To preserve a clean layout on smaller screens, the navigation buttons are hidden on mobile devices.

Instead, navigation is handled via:

- Touch swipe gestures

- Mouse drag interactions (click and hold)

This allows for an intuitive interaction model across both touch and non-touch devices while maintaining visual simplicity.
