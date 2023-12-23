 # Pixels Realtime Chat Translator

 This project is a Chrome extension that uses OpenAI GPT-3 to translate text within the in-game chat in real-time for Pixels game players.

 ## Features

 - Real-time translation of in-game chat
 - Language detection
 - Customizable language settings
 - Debug mode for development

 ## How it works

 The extension uses OpenAI's GPT to translate text. It first determines if the text needs translation by comparing the detected language of the text with the user's chosen language. If translation is needed, it sends a request to the OpenAI API to translate the text.

 The extension uses a MutationObserver to watch for changes in the DOM and translate new text nodes as they appear.

 ## Setup

 1. Clone the repository
 2. Load the extension into Chrome
 3. Set your OpenAI API key and preferred language in the options page

 ## Obtaining OpenAI API Key

 To use this extension, you need an OpenAI API key. Here's how to get one:

 1. Visit [OpenAI's website](https://www.openai.com/)
 2. Click on 'Sign Up' to create a new account
 3. After signing up and logging in, navigate to the API section
 4. Generate a new API key
 5. Copy the API key and paste it into the appropriate field in the extension's options page

 ## Code Overview

 The main logic of the extension is contained in content.js. This script contains functions for determining if translation is needed, translating text, and setting up a MutationObserver to watch for new text nodes.

 The options for the extension are handled in options.js. This script saves and restores the user's API key, preferred language, and switch state.

 The background script (background.js) listens for tab events and sends a message to the content script with the API key and CSS selector when a new tab is opened, a tab is switched, or a tab is updated.

 The popup script (popup.js) adds a click event listener to the options button to open the options page.

 The extension's manifest file (manifest.json) specifies the permissions, background script, default popup, options page, and content scripts for the extension.

 The extension's styles are defined in styles.css.

 The extension's popup and options pages are defined in popup.html and options.html, respectively.

 ## Note

 This extension is for educational purposes and is not intended for use in production. Use at your own risk.
