# CLAUDE.md - Local Time Clock Browser Source

## Project Overview
This is a vanilla JavaScript browser source with a customizable analog and digital clock for Twitch streaming.

## Development Commands
- **Preview**: Open `clock-overlay.html` directly in a browser
- **Deployment**: Copy the HTML file to your OBS/Streamlabs browser source
- **Testing**: Manual testing through browser preview

## Code Style Guidelines

### HTML/CSS
- Use semantic HTML5 elements
- CSS variables for theming in `:root` selector
- BEM-like naming for CSS classes (e.g., `.digital-time.rounded`)
- Responsive design with flexible layouts
- Mobile-friendly with appropriate viewport meta tags

### JavaScript
- Vanilla JS only (no frameworks)
- Event-based for UI interactions
- Camel case for variable/function names (e.g., `updateClockNumbers`)
- Prefer `const`/`let` over `var`
- Use ES6+ features (arrow functions, template literals)
- Group related functionality with comments
- Descriptive function and variable names
- Requestanimationframe for smooth animations

### Error Handling
- Gracefully handle errors with try/catch where appropriate
- Validate user inputs from control panel

### General Guidelines
- Keep code modular and well-commented
- Optimize for performance in animation loops
- Follow accessibility best practices