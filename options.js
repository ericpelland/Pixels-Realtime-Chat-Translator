// options.js

// Function to save options
function save_options() {
  var apiKey = document.getElementById('apiKey').value;
  var language = document.getElementById('language').value;
  var switchState = document.getElementById('switchState').checked;

  chrome.storage.sync.set({
    apiKey: apiKey,
    language: language,
    switchState: switchState
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 3000); // increased from 750ms to 3000ms
  });
}

// Restores select box and checkbox state using the preferences stored in chrome.storage.
function restore_options() {
  // Use default value apiKey = '', language = 'en', and switchState = false.
  chrome.storage.sync.get({
    apiKey: '',
    language: 'en',
    switchState: false
  }, function(items) {
    document.getElementById('apiKey').value = items.apiKey;
    document.getElementById('language').value = items.language;
    document.getElementById('switchState').checked = items.switchState;
  });
}

// Event listener for DOMContentLoaded to restore the form state
document.addEventListener('DOMContentLoaded', restore_options);

// Event listener for change on the language select box
document.getElementById('language').addEventListener('change', function() {
  chrome.storage.sync.set({language: this.value}, function() {
    console.log('Language is set to ' + this.value);
  });
});

// Event listener for click on the save button
document.getElementById('optionsForm').addEventListener('submit', function(e) {
  e.preventDefault();
  save_options();
});
