
# Copilot Instructions for cmps-357-react-example

## Project Overview
This is a React + Vite educational project for CMPS 357, demonstrating multi-page navigation, routing, and modern React patterns. The codebase is designed for clarity and maintainability, with a focus on teaching best practices.

## Architecture & Key Patterns
- **Main entry:** `src/main.jsx` mounts the app; `src/App.jsx` defines routes and page transitions.
- **Routing:** Uses React Router DOM (`<Routes>`, `<Route>`, `<Link>`). Navigation is handled by `src/components/Navigation.jsx`.
- **Pages:** All main pages are in `src/pages/` (e.g., `Home.jsx`, `About.jsx`, `Media.jsx`). Each page uses a container `<div>` with inline styles for layout consistency.
- **Transitions:** If present, `src/components/PageTransition.jsx` handles animated transitions between pages (e.g., swipe or fade effects).
- **Assets:** Static images (e.g., `banner.png`, `react.svg`) are in `src/assets/` and imported directly into components.

## Development Workflow
- **Install:** `npm install`
- **Dev server:** `npm run dev` (hot reload)
- **Build:** `npm run build` (production output)
- **Lint:** `npm run lint` (ESLint, strict unused variable rules)
- **Preview:** `npm run preview` (serves production build)

## Project-Specific Conventions
- **Functional components only** (no class components)
- **Explicit React import:** Always use `import React from 'react';` at the top of each component
- **Inline styles:** All component-specific styles are defined inline via the `style` prop; do not create new CSS files for components
- **Layout:** Use CSS Grid and Flexbox via inline styles for responsive layouts
- **File naming:** Use PascalCase for all component and page files
- **Exports:** Always use default export for components
- **Semantic HTML:** Prefer `<section>`, `<main>`, `<header>`, etc. in page components

## ESLint & Quality
- Unused variables are errors (except those starting with uppercase or underscore)
- React Hooks rules are strictly enforced
- Run `npm run lint` before every commit
- Ensure `npm run build` passes before pushing changes

## Examples
**Inline style pattern:**
```jsx
<div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
  {/* Page content */}
</div>
```

**Responsive grid:**
```jsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
  {/* Media items */}
</div>
```

## Integration Points
- No backend/API calls; all data is static or local
- No global state management (Redux, Context) in this example
- All navigation is client-side via React Router

## When Making Changes
1. Run `npm run lint` to check for errors
2. Run `npm run build` to verify production build
3. Test in browser with `npm run dev`
4. Keep changes minimal, focused, and consistent with inline style/layout patterns

---
**If any section is unclear or missing, please provide feedback so instructions can be improved for future AI agents.**
