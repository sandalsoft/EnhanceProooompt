# Text Enhancer Chrome Extension

A Chrome extension that adds an enhancement button with logo to textareas on specified domains. When clicked, the button sends the textarea content to an LLM API and replaces the content with the enhanced response.

## Features

- Adds an enhancement button with logo to textareas on specified domains
- Configurable API key and target domain
- Selectable LLM model
- Real-time text enhancement with API integration

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top-right corner)
4. Click "Load unpacked" and select the extension directory
5. The extension should now be installed and visible in your Chrome toolbar

## Configuration

1. Click the extension icon in the Chrome toolbar
2. Enter your LLM API key (e.g., from OpenAI)
3. Specify the target domain where the extension should be active
4. Select your preferred LLM model
5. Click "Save Settings"

## Usage

1. Navigate to the configured target domain
2. Find a textarea element on the page
3. Click the enhancement button (with logo) that appears near the textarea
4. The text in the textarea will be sent to the LLM API and replaced with the enhanced response

## Development

### Project Structure

- `manifest.json`: Extension configuration
- `content.js`: Injects the enhance button and handles API calls
- `popup.html` & `popup.js`: Settings UI and storage management
- `styles.css`: Styling for the enhance button
- `background.js`: Background service worker
- `images/`: Contains icon files for the extension
- `logo.svg`: SVG icon used for the enhancement button

### Icons

The extension uses PNG icons in multiple sizes (16x16, 48x48, 128x128) and an SVG logo for the enhancement button. There are several ways to generate or modify these icons:

1. Use the included SVG icon in `images/icon.svg` as a base
2. Run `node images/pixel_icons.js` to generate simple placeholder icons
3. Open `images/generate_placeholder_icons.html` in a browser to create more detailed icons
4. For more advanced conversion, install the `canvas` npm package and run `node create_icons.js`

### Building from Source

No build step is required. The extension can be loaded directly as an unpacked extension in Chrome.

## License

MIT

## Privacy

This extension requires an API key to function. Your API key is stored in Chrome's sync storage and is only sent to the LLM API service you configure. Text from textareas is sent to the LLM API service for processing. No data is collected by the extension developer.

## Recent Changes

- Replaced text-based "Enhance" button with SVG logo for a cleaner, more professional look
