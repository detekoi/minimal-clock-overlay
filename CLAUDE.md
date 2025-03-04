# CLAUDE.md - Local Time Clock Browser Source

## Build & Development
- **Preview**: Open `clock-overlay.html` directly in a browser
- **Deploy**: Use as OBS/Streamlabs browser source (300x300px recommended)
- **Test**: Manual testing via browser preview
- **Debug**: Use browser developer tools (F12) for inspecting/debugging

## Code Style Guidelines
- **General**: Vanilla JS only, no frameworks or dependencies
- **Formatting**: 2-space indentation, consistent newlines
- **Naming**: camelCase for variables/functions, descriptive names
- **JS**: ES6+ features, `const`/`let` over `var`, arrow functions
- **CSS**: BEM-like naming, CSS variables in `:root`, responsive design
- **Markup**: Semantic HTML5 elements, appropriate ARIA attributes
- **Documentation**: JSDoc-style comments for functions
- **Performance**: Use requestAnimationFrame for animations, minimize DOM updates
- **Error Handling**: try/catch for timezone and localStorage operations
- **Organization**: Group related functionality with comments

## Architecture
- Single HTML file with embedded CSS and JavaScript
- Settings stored in localStorage for persistence
- Theme system using CSS variables and class toggling
- Event-based UI for controls and draggable elements
- Time calculations handle multiple timezones
- OBS compatibility mode for dropdown menu issues