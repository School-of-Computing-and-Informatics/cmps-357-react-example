# Copilot Instructions for cmps-357-react-example

## Project Overview
This is a React + Vite educational example project demonstrating a multi-page React application with routing. The project is used for teaching web development concepts in CMPS 357.

## Technology Stack
- **Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Routing**: React Router DOM 7.9.3
- **Linting**: ESLint 9.36.0
- **Language**: JavaScript (ES2020+)

## Project Structure
```
src/
├── App.jsx              # Main application component with routing
├── App.css              # Application styles
├── main.jsx             # Application entry point
├── index.css            # Global styles
├── components/          # Reusable components
│   └── Navigation.jsx   # Navigation component
├── pages/               # Page components
│   ├── Home.jsx         # Home page
│   ├── About.jsx        # About page
│   └── Media.jsx        # Media gallery page
└── assets/              # Static assets
```

## Development Commands
- `npm install` - Install dependencies
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Coding Standards

### JavaScript/React Guidelines
- Use functional components with hooks (not class components)
- Import React explicitly: `import React from 'react';`
- Use ES6+ features (arrow functions, destructuring, template literals)
- Export components as default: `export default ComponentName;`

### Styling Approach
- This project uses **inline styles** extensively
- Define style objects directly in JSX using the `style` prop
- Do NOT create separate CSS files for component-specific styles
- Use CSS Grid and Flexbox for layouts
- Example pattern:
  ```jsx
  <div style={{ 
    padding: '20px', 
    maxWidth: '800px', 
    margin: '0 auto' 
  }}>
  ```

### File Organization
- Place page components in `src/pages/`
- Place reusable components in `src/components/`
- Each component should be in its own file
- Use PascalCase for component file names (e.g., `Navigation.jsx`)

### ESLint Rules
- Unused variables are errors (except those starting with uppercase or underscore)
- React Hooks rules are enforced
- Follow the configured ESLint rules in `eslint.config.js`

## Common Patterns in This Project

### Page Components
- Wrapped in a container div with consistent padding and max-width
- Use semantic HTML (sections, headings)
- Include descriptive content

### Inline Styles
- Color values use hex codes (e.g., `#2196f3`)
- Spacing uses pixels (e.g., `padding: '20px'`)
- Responsive grids: `display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'`

### Navigation
- Uses React Router's `Link` component for navigation
- Active link styling with `isActive` callback

## Testing & Quality
- Always run `npm run lint` before committing
- Ensure `npm run build` completes successfully
- This is an educational project - focus on code clarity and maintainability

## When Making Changes
1. Run `npm run lint` to check for linting errors
2. Run `npm run build` to ensure the build works
3. Test in the browser with `npm run dev`
4. Keep changes minimal and focused
5. Maintain consistency with existing code style
