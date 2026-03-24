## 2026-03-03 - Navigation Accessibility Patterns
**Learning:** Icon-only buttons (like floating 'Back to Top' and 'Back to Home') and interactive menu toggles require explicit ARIA attributes to be accessible to screen reader users. Specifically, `aria-label` provides a textual alternative, and `aria-expanded` combined with `aria-controls` communicates the state of collapsible menus.
**Action:** Always include `aria-label` for SVG-only buttons and synchronize `aria-expanded` via JavaScript for any toggle interactions.

## 2026-03-24 - Interactive Component Accessibility & Lifecycle
**Learning:** In a vanilla JS environment where content is rendered dynamically (like item cards in rich.html), components must be manually enhanced with ARIA roles and keyboard listeners. Using a global listener with a 'window' level guard property prevents duplicate registrations if the initialization script is called multiple times.
**Action:** Always include 'tabindex="0"', 'role="button"', and 'aria-pressed' for interactive 'div' elements, and use 'window._listenerAdded' guards for global keyboard handlers.
