## 2026-03-03 - Navigation Accessibility Patterns
**Learning:** Icon-only buttons (like floating 'Back to Top' and 'Back to Home') and interactive menu toggles require explicit ARIA attributes to be accessible to screen reader users. Specifically, `aria-label` provides a textual alternative, and `aria-expanded` combined with `aria-controls` communicates the state of collapsible menus.
**Action:** Always include `aria-label` for SVG-only buttons and synchronize `aria-expanded` via JavaScript for any toggle interactions.

## 2026-03-03 - Inverted Theme Logic & Grid Keyboard Accessibility
**Learning:** This repository uses inverted theme naming: applying the `.dark-mode` class to the `body` actually enables the *Light* theme. Additionally, grid-based item lists (like those in `rich.html`) often lack keyboard affordance. Using `tabindex="0"`, `role="button"`, and `onkeydown` listeners (Space/Enter) significantly improves accessibility for non-mouse users.
**Action:** When styling for themes, verify the actual visual state rather than relying on class names. Ensure all interactive cards in grid layouts are focusable and triggerable via keyboard.
