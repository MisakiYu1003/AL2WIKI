## 2026-03-03 - Navigation Accessibility Patterns
**Learning:** Icon-only buttons (like floating 'Back to Top' and 'Back to Home') and interactive menu toggles require explicit ARIA attributes to be accessible to screen reader users. Specifically, `aria-label` provides a textual alternative, and `aria-expanded` combined with `aria-controls` communicates the state of collapsible menus.
**Action:** Always include `aria-label` for SVG-only buttons and synchronize `aria-expanded` via JavaScript for any toggle interactions.

## 2026-03-03 - Item Card Interaction Patterns
**Learning:** Interactive elements implemented as `div` components (like item cards in `rich.html`) must include `tabindex="0"`, `role="button"`, and `aria-pressed` attributes. Keyboard support for 'Enter' and 'Space' should be delegated to the parent container, and focus-visible indicators must be explicitly styled to remain consistent with the accessibility patterns.
**Action:** Use `setAttribute('aria-pressed', ...)` in JavaScript to toggle selection states and add `outline: 3px solid var(--rich-card-selected-border); outline-offset: 2px;` for custom focus indicators.

## 2026-03-04 - Dynamic Table UX and Alignment
**Learning:** When rendering tables dynamically from large datasets, it is critical to keep the cell count in row templates synchronized with header definitions. A common bug in this repository is having extra or missing `<td>` elements, leading to layout shifts. Additionally, providing an empty state row with a proper `colspan` is essential for user feedback when filters return zero results.
**Action:** Always count `<th>` elements or check the `columns` array length before defining row templates. Use a centered `<tr><td colspan="...">` for "No results" messages to maintain table structure.
