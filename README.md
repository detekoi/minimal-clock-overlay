# Minimal Clock Overlay for OBS

A lightweight, customizable clock overlay for OBS. Perfect for streamers who want to display the time without distracting from their content.

![Default Clock](screenshots/default-clock.png)

## Features

- **Minimal Design**: Clean, unobtrusive clock with subtle styling
- **Flexible Display**: Choose to show analog clock, digital time, or both
- **Time Zone Support**: Display any time zone with optional time zone label
- **Customizable**: Multiple appearance options including:
  - Four beautiful themes: Light, Dark, Natural, and Transparent
  - Toggle for clock numbers (Arabic or Roman numerals)
  - AM/PM or 24-hour time format
  - Digital clock font styles (including serif option)
  - Color and size customization
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
- **Clock Numbers**: Show or hide hour numbers on the clock face
- **Number Style**: Choose between simple numbers, Roman numerals, dots, or serif
- **Digital Style**: Different font options including rounded, simple, monospace, and serif
- **Theme**: Choose from Light, Dark, Natural (warm beige), or Transparent modes
- **Scale**: Adjust the overall size of the clock
- **Hand Thickness**: Choose between thin, normal, or thick clock hands
- **Accent Color**: Customize the accent color used for highlights
- **Accent Size**: Adjust the size of accent elements (center dot, second hand tip) or hide completely
- **Second Hand Color**: Set a custom color for the second hand
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


## License

This project is licensed under the BSD 3-Clause License - see the LICENSE file for details.