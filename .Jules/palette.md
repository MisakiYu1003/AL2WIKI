## 2026-03-03 - Navigation Accessibility Patterns
**Learning:** Icon-only buttons (like floating 'Back to Top' and 'Back to Home') and interactive menu toggles require explicit ARIA attributes to be accessible to screen reader users. Specifically, `aria-label` provides a textual alternative, and `aria-expanded` combined with `aria-controls` communicates the state of collapsible menus.
**Action:** Always include `aria-label` for SVG-only buttons and synchronize `aria-expanded` via JavaScript for any toggle interactions.

## 2026-03-03 - Keyboard Shortcut Discoverability & ID Inconsistency
**Learning:** Global keyboard shortcuts (like '/' for search) are powerful but often remain hidden features. Promoting them via placeholder hints like "(按 / 搜尋)" significantly improves discoverability without cluttering the UI. Additionally, a mature project may have inconsistent element IDs (e.g., `#searchInput` vs `#kw`) for similar components across pages, necessitating robust selector logic in global scripts.
**Action:** Append shortcut hints to input placeholders dynamically. Ensure global selectors handle all common ID variants used in the codebase.
