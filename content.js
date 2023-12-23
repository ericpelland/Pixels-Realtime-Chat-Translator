// content.js

// Set debug mode
const DEBUG = true;

// Function to log to console only in debug mode
function debugLog(message) {
  if (DEBUG) {
    console.log(message);
  }
}

// Function to translate text using OpenAI API
async function translateText(apiKey, text) {
  debugLog(`Translating text: ${text}`); // Added logging
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        'model': 'gpt-3.5-turbo',
        'messages': [
          {
            'role': 'system',
            'content': 'You are a helpful assistant that translates all text given to English.  If it is already english just repeat the input.  Do not say or add anything else.  If you can not help, or there is an error, or you cant translate for any reason just repeat the input.  If you can translate some of the message, but not all of it leave the untranslatable parts as they are.  This is a game chat, lots of internet slang, and acronyms.  Do not correct puncuation or grammer or spelling if wrong and in english.'
          },
          {
            'role': 'user',
            'content': text
          }
        ]
      })
    });

    const data = await response.json();
    if (data['choices'] && data['choices'].length > 0) {
      return data['choices'][0]['message']['content'];
    } else {
      throw new Error('No translation found');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function findAndTranslateText(apiKey, cssSelector) {
  let elements = Array.from(document.querySelectorAll(cssSelector)).reverse().slice(0, 10);
  debugLog(`Found ${elements.length} elements with the selector: ${cssSelector}`); // Added logging

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    const nodeIterator = document.createNodeIterator(element, NodeFilter.SHOW_TEXT);
    let currentNode;
    while (currentNode = nodeIterator.nextNode()) {
      if (currentNode.nodeValue.trim() !== '') {
        // Check if text was already translated
        if (currentNode.parentNode.classList.contains('translated')) {
          debugLog(`'${currentNode.nodeValue}' was already translated`); // Added logging
        } else {
          debugLog(`Translating '${currentNode.nodeValue}'`); // Added logging
          const translatedText = await translateText(apiKey, currentNode.nodeValue);
          if (translatedText !== currentNode.nodeValue) {
            currentNode.nodeValue = translatedText;
            currentNode.parentNode.style.color = 'green';
          }
          currentNode.parentNode.classList.add('translated');
        }
      }
    }
  }
}

function setupObserver(apiKey, cssSelector) {
  // Create a mutation observer to watch for changes in the DOM
  const observer = new MutationObserver((mutationsList, observer) => {
    for(let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        findAndTranslateText(apiKey, cssSelector);
      }
    }
  });

  // Start observing the document with the configured parameters
  observer.observe(document, { childList: true, subtree: true });
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  debugLog(`Received message with apiKey: ${request.apiKey} and cssSelector: ${request.cssSelector}`); // Added logging
  findAndTranslateText(request.apiKey, request.cssSelector);
  setupObserver(request.apiKey, request.cssSelector);
});
