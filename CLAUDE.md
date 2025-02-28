# CLAUDE.md - Local Time Clock Browser Source

## Project Overview
This is a vanilla JavaScript browser source with a customizable analog and digital clock for Twitch streaming, inspired by Polar Bear Cafe aesthetic.

## Development Commands
- **Preview**: Open `clock-overlay.html` directly in a browser
- **Deployment**: Copy the HTML file to your OBS/Streamlabs browser source (recommended size 300x300)
- **Testing**: Manual testing through browser preview

## OBS/Streamlabs Integration
1. Add a new Browser Source in OBS/Streamlabs
2. Set width and height (recommended: 300x300)
3. Check "Local file" and browse to select the HTML file
4. Check "Refresh browser when scene becomes active" (optional)

## Key Features
- Analog clock with customizable hands, face, and markers
- Digital time display with multiple font options (rounded, simple, monospace, serif)
- Multiple display styles for clock numbers (simple, Roman, dots, serif)
- Dark mode and transparent mode for different stream backgrounds
- Fully draggable and scalable interface
- Custom accent colors and sizes (can be reduced to invisible)
- Clock hand thickness options (thin, normal, thick)
- Display seconds in digital time option

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
- RequestAnimationFrame for smooth animations

### Error Handling
- Gracefully handle errors with try/catch where appropriate
- Validate user inputs from control panel

### General Guidelines
- Keep code modular and well-commented
- Optimize for performance in animation loops
- Follow accessibility best practices