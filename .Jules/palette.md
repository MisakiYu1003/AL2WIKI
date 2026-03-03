## 2026-03-03 - Navigation Accessibility Patterns
**Learning:** Icon-only buttons (like floating 'Back to Top' and 'Back to Home') and interactive menu toggles require explicit ARIA attributes to be accessible to screen reader users. Specifically, `aria-label` provides a textual alternative, and `aria-expanded` combined with `aria-controls` communicates the state of collapsible menus.
**Action:** Always include `aria-label` for SVG-only buttons and synchronize `aria-expanded` via JavaScript for any toggle interactions.
