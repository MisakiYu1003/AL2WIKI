## 2026-03-03 - Navigation Accessibility Patterns
**Learning:** Icon-only buttons (like floating 'Back to Top' and 'Back to Home') and interactive menu toggles require explicit ARIA attributes to be accessible to screen reader users. Specifically, `aria-label` provides a textual alternative, and `aria-expanded` combined with `aria-controls` communicates the state of collapsible menus.
**Action:** Always include `aria-label` for SVG-only buttons and synchronize `aria-expanded` via JavaScript for any toggle interactions.

## 2026-03-27 - Keyboard Accessibility for Interactive Divs
**Learning:** Interactive elements implemented as `div` components (like item cards in `rich.html`) must include `tabindex="0"`, `role="button"`, and `aria-pressed` attributes, along with keyboard event listeners for 'Enter' and 'Space' to ensure full accessibility for non-mouse users.
**Action:** When creating interactive custom components, always implement standard keyboard interaction patterns and synchronize ARIA states with visual changes.
