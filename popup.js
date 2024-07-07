// popup.js

// Save options to chrome.storage
function saveOptions() {
  const titleChecked = document.getElementById("title").checked;
  const descriptionChecked = document.getElementById("description").checked;
  const badgesChecked = document.getElementById("badges").checked;

  chrome.storage.sync.set(
    {
      titleChecked: titleChecked,
      descriptionChecked: descriptionChecked,
      badgesChecked: badgesChecked,
    },
    () => {
      // Refresh the current tab to apply changes
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.reload(tabs[0].id);
      });
    }
  );
}

// Restore checkbox states using the preferences stored in chrome.storage
function restoreOptions() {
  chrome.storage.sync.get(
    {
      titleChecked: true,
      descriptionChecked: true,
      badgesChecked: true,
    },
    (items) => {
      document.getElementById("title").checked = items.titleChecked;
      document.getElementById("description").checked = items.descriptionChecked;
      document.getElementById("badges").checked = items.badgesChecked;
    }
  );
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
