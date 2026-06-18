## 2026-03-03 - Navigation Accessibility Patterns
**Learning:** Icon-only buttons (like floating 'Back to Top' and 'Back to Home') and interactive menu toggles require explicit ARIA attributes to be accessible to screen reader users. Specifically, `aria-label` provides a textual alternative, and `aria-expanded` combined with `aria-controls` communicates the state of collapsible menus.
**Action:** Always include `aria-label` for SVG-only buttons and synchronize `aria-expanded` via JavaScript for any toggle interactions.

## 2026-03-03 - Item Card Interaction Patterns
**Learning:** Interactive elements implemented as `div` components (like item cards in `rich.html`) must include `tabindex="0"`, `role="button"`, and `aria-pressed` attributes. Keyboard support for 'Enter' and 'Space' should be delegated to the parent container, and focus-visible indicators must be explicitly styled to remain consistent with the accessibility patterns.
**Action:** Use `setAttribute('aria-pressed', ...)` in JavaScript to toggle selection states and add `outline: 3px solid var(--rich-card-selected-border); outline-offset: 2px;` for custom focus indicators.

## 2026-03-27 - Search Interface Standardized Feedback
**Learning:** Providing explicit "No results found" feedback is critical for a good user experience in search-driven interfaces. When filters or search terms yield no matches, the user should be clearly informed rather than shown a blank screen. Additionally, reinforcing global keyboard shortcuts (like '/') via placeholder hints and ensuring focus returns to the input after clearing improves interaction flow.
**Action:** Always implement a hidden 'no-results' container that toggles based on filter results, and standardize search inputs with ARIA labels and shortcut hints.
