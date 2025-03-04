# Minimal Clock Overlay for OBS

A lightweight, customizable clock overlay for OBS. Perfect for streamers who want to display the time without distracting from their content.

![Default Clock](screenshots/default-clock.png)

[Click here](https://detekoi.github.io/minimal-clock-overlay/clock-overlay.html) for a live demo!

## Features

- **Minimal Design**: Clean, unobtrusive clock with subtle styling
- **Flexible Display**: Choose to show analog clock, digital time, or both
- **Date & Time Zone Support**: Display date and time zone with customizable styles
- **Customizable**: Multiple appearance options including:
  - Nine beautiful themes: Light, Dark, Natural, Transparent, Neon, Pastel, Forest, Sunset, and Ocean
  - Fifteen pre-defined style presets (Modern, Cyberpunk, Lo-Fi, Nature, and more)
  - Toggle for clock numbers (Arabic or Roman numerals)
  - AM/PM or 24-hour time format
  - Customizable font styles for digital clock, date, and time zone (including serif and LCD display)
  - Color and size customization
- **OBS/Streamlabs Compatibility**: Built-in compatibility mode for browser sources with dropdown issues
- **Draggable**: Position anywhere on your stream
- **Low Resource Usage**: Optimized for minimal CPU usage
- **OBS Integration**: Works perfectly as a Browser Source


## Installation

1. In OBS Studio, add a new "Browser Source"
2. Set the width and height to appropriate values (recommended: 300x300)
3. Check "Local file" and browse to select the HTML file
4. Check "Refresh browser when scene becomes active" (optional)

## Usage

- **Moving the Clock**: Click and drag the clock face to reposition
- **Accessing Settings**: Hover over the clock and click the gear icon
- **Closing Settings**: Click the "Close Settings" button or click away

## Customization Options

![Settings Panel](screenshots/settings-panel.png)

- **Second Hand**: Toggle visibility of the second hand
- **Display Mode**: Choose between analog clock, digital time, or both
- **AM/PM Display**: Switch between 12-hour (with AM/PM) and 24-hour format
- **Display Seconds**: Toggle seconds in the digital time display
- **Time Zone**: Select from multiple time zones around the world
- **Show Time Zone**: Display the name of the selected time zone below the clock
- **Time Zone Style**: Choose from different font styles (rounded, simple, monospace, serif, LCD)
- **Show Date**: Toggle the display of the current date
- **Date Style**: Choose from different font styles (rounded, simple, monospace, serif, LCD)
- **Clock Numbers**: Show or hide hour numbers on the clock face
- **Number Style**: Choose between simple numbers, Roman numerals, dots, or serif
- **Digital Style**: Different font options including rounded, simple, monospace, serif, and LCD display
- **Theme**: Choose from nine themes:
  - Light: Clean white background with dark elements
  - Dark: Dark background with light elements
  - Natural: Warm beige tones with brown accents
  - Transparent: No background, perfect for overlaying on stream content
  - Neon: Cyberpunk-inspired with bright cyan and magenta
  - Pastel: Soft lavender and pink hues
  - Forest: Natural greens with earthy orange accents
  - Sunset: Dark night sky with sunset orange and pink accents
  - Ocean: Calming blue tones with aqua accents
- **Scale**: Adjust the overall size of the clock
- **Hand Thickness**: Choose between thin, normal, or thick clock hands
- **Accent Color**: Customize the accent color used for highlights
- **Accent Size**: Adjust the size of accent elements (center dot, second hand tip) or hide completely
- **Second Hand Color**: Set a custom color for the second hand
- **OBS/Streamlabs Mode**: Toggle compatibility mode for browser sources with dropdown issues
- **Style Presets**: Choose from predefined style combinations:
  - Modern Minimal: Clean, minimalist design with blue accents
  - Coastal Calm: Soothing blue and teal color scheme
  - Art Deco: Elegant gold and black design
  - Digital Display: LCD digital-only display with a tech feel
  - Traditional: Classic Roman numeral clock with natural wood tones
  - Gaming HUD: Transparent clock with gaming-inspired neon colors
  - Retro Vibe: Warm oranges with thicker hands for a vintage feel
  - Dark Tech: Modern dark theme with dot markers and purple accents
  - Elegant Serif: Roman numerals with thin hands for a sophisticated look
  - Cyberpunk: Futuristic neon design with bright magenta and green
  - Lo-Fi: Soft pastel colors for a relaxed, lofi aesthetic
  - Nature: Forest-inspired with earthy greens and wood tones
  - Twilight: Dark sunset theme with orange and red accents
  - Candy Pop: Playful pink and blue with thicker elements
- **Reset to Defaults**: Restore all settings to their default values
- **Persistent Settings**: All your customizations are automatically saved between sessions

## Tips for Streamers

- **Use Transparent Theme**: For gameplay streams, the transparent theme provides time information without blocking gameplay
- **Match Your Brand**: Use the color pickers to match your stream's color scheme
- **Position Strategically**: Place in a corner where it won't overlap important HUD elements in games

## Troubleshooting

- **Clock Not Visible**: Make sure the browser source is properly sized and positioned
- **Settings Not Appearing**: Click directly on the gear icon that appears when hovering over the clock
- **Settings Panel Off Screen**: Try moving the clock away from the edge of your canvas
- **Dropdown Menus Not Working**: OBS has known issues with dropdown menus in Browser Sources. The clock now has a built-in "OBS/Streamlabs Mode" (enabled by default) which replaces dropdowns with compatible button selectors. If you still have issues, check that this mode is enabled in the settings panel.


## Credits

- Alarm Clock Font by [David J Patterson](https://www.dafont.com/david-j-patterson.d5686), included for use with the digital time display
- VFD Nova Font by [Nihar Mazumdar](https://www.fontspace.com/nihar-mazumdar), included as a fallback font

## License

This project is licensed under the BSD 3-Clause License - see the LICENSE file for details.