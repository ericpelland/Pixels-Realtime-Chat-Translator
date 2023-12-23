// popup.js

document.addEventListener('DOMContentLoaded', function() {
  var optionsButton = document.getElementById('optionsButton');

  // Add click event listener to the options button
  optionsButton.addEventListener('click', function() {
    // Open the options page when the options button is clicked
    if (chrome.runtime.openOptionsPage) {
      // New way to open options pages, if supported (Chrome 42+).
      chrome.runtime.openOptionsPage();
    } else {
      // Reasonable fallback.
      window.open(chrome.runtime.getURL('options.html'));
    }
  });
});
