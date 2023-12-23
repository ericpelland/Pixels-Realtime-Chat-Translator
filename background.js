// background.js

// Listen for when the user opens a new tab
chrome.tabs.onCreated.addListener(function(tab) {
  chrome.storage.sync.get(['apiKey', 'cssSelector', 'switchState'], function(items) {
    if (items.switchState) {
      // Send a message to the content script with the API key and CSS selector
      chrome.tabs.sendMessage(tab.id, {apiKey: items.apiKey, cssSelector: items.cssSelector});
    }
  });
});

// Listen for when the user switches tabs
chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.storage.sync.get(['apiKey', 'cssSelector', 'switchState'], function(items) {
    if (items.switchState) {
      // Send a message to the content script with the API key and CSS selector
      chrome.tabs.sendMessage(activeInfo.tabId, {apiKey: items.apiKey, cssSelector: items.cssSelector});
    }
  });
});

// Listen for when the user updates a tab
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    chrome.storage.sync.get(['apiKey', 'cssSelector', 'switchState'], function(items) {
      if (items.switchState) {
        // Send a message to the content script with the API key and CSS selector
        chrome.tabs.sendMessage(tabId, {apiKey: items.apiKey, cssSelector: items.cssSelector});
      }
    });
  }
});
