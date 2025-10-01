# GitHub Copilot Instructions for cmps-357-react-example

## Project Overview

This is an educational React application built with Vite, showcasing a simple multi-page website for a fictional technology company called "TechSolutions Inc." The project is designed to demonstrate fundamental React concepts, routing, and modern web development practices for learning purposes.

### Project Goals and Domain
- **Primary Purpose**: Educational example for learning React fundamentals
- **Domain**: Corporate website with informational pages
- **Target Audience**: Students learning React and modern JavaScript
- **Key Features**: 
  - Multi-page navigation using React Router
  - Component-based architecture
  - Inline styling patterns
  - Responsive design concepts

## Tech Stack

### Core Technologies
- **React** (v19.1.1): UI library for building component-based interfaces
- **React Router DOM** (v7.9.3): Client-side routing
- **Vite** (v7.1.7): Build tool and development server
- **ESLint** (v9.36.0): Code linting and quality enforcement

### Development Tools
- **@vitejs/plugin-react**: Enables React Fast Refresh in Vite
- **ESLint plugins**: 
  - `eslint-plugin-react-hooks`: Enforces React Hooks rules
  - `eslint-plugin-react-refresh`: Validates Fast Refresh constraints

## Project Structure

```
src/
├── App.jsx                 # Main application component with routing
├── App.css                 # Global application styles
├── main.jsx                # Application entry point
├── index.css               # Base CSS styles
├── components/
│   └── Navigation.jsx      # Shared navigation component
├── pages/
│   ├── Home.jsx           # Home page component
│   ├── About.jsx          # About page component
│   └── Media.jsx          # Media/Gallery page component
└── assets/
    └── react.svg          # Static assets
```

## Code Style and Conventions

### JavaScript/JSX Style
1. **Use functional components** with hooks (no class components)
2. **File naming**: PascalCase for component files (e.g., `Navigation.jsx`)
3. **Component naming**: Match the filename (e.g., `Navigation` component in `Navigation.jsx`)
4. **Import order**:
   ```javascript
   // 1. External libraries
   import React from 'react';
   import { Link, useLocation } from 'react-router-dom';
   
   // 2. Internal components/styles
   import Navigation from './components/Navigation';
   import './App.css';
   ```

### Styling Conventions
This project uses **inline styles** defined as JavaScript objects within components:

```javascript
const navStyle = {
  backgroundColor: '#2c3e50',
  padding: '1rem 0',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};
```

**Key styling patterns:**
- Define style objects within the component function
- Use camelCase for CSS properties (e.g., `backgroundColor` not `background-color`)
- Keep related styles grouped together
- Use descriptive variable names for style objects (e.g., `navStyle`, `linkStyle`)
- Prefer object spreading for style variations: `{ ...baseStyle, additionalProp: value }`

### React Patterns Used

#### 1. Component Structure
```javascript
import React from 'react';

const ComponentName = () => {
  // Hooks at the top
  const location = useLocation();
  
  // Style definitions
  const styles = {
    container: { /* ... */ }
  };
  
  // Helper functions
  const helperFunction = () => { /* ... */ };
  
  // Return JSX
  return (
    <div style={styles.container}>
      {/* Content */}
    </div>
  );
};

export default ComponentName;
```

#### 2. Navigation Pattern
- Uses React Router's `useLocation` hook for active state
- Implements hover effects via inline event handlers
- Active links are styled differently using conditional logic

#### 3. No State Management
- This project intentionally avoids global state management
- Components are primarily presentational
- Minimal use of hooks (mainly `useLocation` for routing)

### ESLint Configuration
- Uses ESLint flat config format (eslint.config.js)
- Enforces React Hooks rules
- Configured for browser globals
- Special rule: Unused vars starting with capital letters or underscores are ignored

## Preferred Libraries and Patterns

### DO Use:
- ✅ **React Router DOM** for navigation and routing
- ✅ **Inline styles** for component styling
- ✅ **Functional components** with arrow function syntax
- ✅ **React Hooks** (useState, useEffect, useLocation, etc.)
- ✅ **Modern ES6+ syntax** (arrow functions, destructuring, spread operator)

### DO NOT Use (unless explicitly needed):
- ❌ Class components
- ❌ External CSS modules or CSS-in-JS libraries (styled-components, emotion, etc.)
- ❌ State management libraries (Redux, MobX, Zustand)
- ❌ UI component libraries (Material-UI, Ant Design, etc.)
- ❌ TypeScript (this is a JavaScript project)

## Special Instructions for GitHub Copilot

### When Writing New Components:

1. **Always start with this template:**
   ```javascript
   import React from 'react';
   
   const ComponentName = () => {
     return (
       <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
         <h1>Page Title</h1>
         {/* Content */}
       </div>
     );
   };
   
   export default ComponentName;
   ```

2. **For navigation links:**
   - Use the `Link` component from `react-router-dom`
   - Implement active state using `useLocation()`
   - Add hover effects with `onMouseOver` and `onMouseOut`

3. **For styling:**
   - Define all styles as JavaScript objects within the component
   - Use descriptive names for style objects
   - Keep consistent color palette: 
     - Primary: `#2c3e50` (dark blue-gray)
     - Secondary: `#3498db` (blue)
     - Accent: `#4a90e2` (lighter blue)
     - Hover: `#34495e` (slightly lighter dark blue)

### When Adding Routes:

1. Add the route in `App.jsx` within the `<Routes>` component:
   ```javascript
   <Route path="/new-page" element={<NewPage />} />
   ```

2. Add the navigation link in `Navigation.jsx`:
   ```javascript
   <li>
     <Link 
       to="/new-page" 
       style={isActive('/new-page') ? activeLinkStyle : linkStyle}
       onMouseOver={(e) => {
         if (!isActive('/new-page')) {
           e.target.style.backgroundColor = '#34495e';
         }
       }}
       onMouseOut={(e) => {
         if (!isActive('/new-page')) {
           e.target.style.backgroundColor = 'transparent';
         }
       }}
     >
       New Page
     </Link>
   </li>
   ```

### Code Generation Guidelines

1. **Be consistent with existing patterns** - review similar components before generating new code
2. **Use semantic HTML** - proper heading hierarchy, meaningful element choices
3. **Include accessibility attributes** where appropriate (alt text, ARIA labels)
4. **Keep components focused** - single responsibility principle
5. **Avoid premature optimization** - prioritize clarity and maintainability

## Example Copilot Prompts

### Creating a New Page Component
```
Create a new Contact page component with:
- A heading "Contact Us"
- A contact form with name, email, and message fields
- Submit button styled consistently with the project
- Use inline styles matching the existing color scheme
- Form should be centered with max-width of 600px
```

### Adding Interactive Features
```
Add a collapsible FAQ section to the About page:
- Array of questions and answers
- Click to expand/collapse each item
- Smooth transition effect
- Use inline styles with the project's color palette
- Maintain accessibility
```

### Creating Reusable Components
```
Create a Card component that accepts:
- title (string)
- content (string or JSX)
- backgroundColor (optional, default to white)
- Uses inline styles
- Includes shadow and rounded corners
- Responsive padding
```

### Styling Improvements
```
Update the Navigation component to add:
- Smooth transitions for hover effects
- Active indicator bar under the current page link
- Mobile-responsive menu (hamburger icon)
- Keep existing inline style pattern
```

### Adding Data Display
```
Create a Services page that displays:
- Grid layout of service cards (3 columns on desktop, 1 on mobile)
- Each card with icon, title, and description
- Hover effect that slightly elevates the card
- Use array.map() to render from data array
- Inline styles following project conventions
```

### Form Handling
```
Add form validation to a contact form:
- Validate email format
- Ensure all fields are filled
- Display error messages inline
- Use useState hook for form state
- Show success message on submit
- Keep styling consistent with project
```

## Build and Development Commands

```bash
# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Important Notes

1. **No Backend**: This is a frontend-only application with no API calls or backend integration
2. **Static Data**: All content is hardcoded in components (no database or CMS)
3. **Educational Focus**: Code clarity is prioritized over advanced optimizations
4. **Inline Styles**: While not ideal for large applications, inline styles are used here for simplicity and to keep all component code in one place
5. **Version Compatibility**: Using React 19 - be aware of any breaking changes from earlier versions

## Common Pitfalls to Avoid

1. ❌ Don't use `className` for styling - use inline `style` prop instead
2. ❌ Don't create separate CSS files - keep styles inline
3. ❌ Don't add complex state management - keep it simple
4. ❌ Don't use old React patterns (class components, lifecycle methods)
5. ❌ Don't forget to export components as default exports
6. ❌ Don't mix routing libraries - stick with React Router DOM

## When to Ask for Clarification

- If you're unsure whether to add a new dependency
- If the requested feature requires significant architectural changes
- If styling needs conflict with the inline style pattern
- If state management requirements exceed simple useState usage
- If the feature requires backend integration or external APIs

## Resources for Learning

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Vite Documentation](https://vitejs.dev)
- [ESLint Configuration](https://eslint.org/docs/latest/)

---

**Remember**: This project emphasizes clarity and educational value. When in doubt, choose the simpler, more readable approach over complex optimizations.
