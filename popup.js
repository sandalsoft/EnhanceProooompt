// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get DOM elements
  const apiKeyInput = document.getElementById('api-key');
  const targetDomainInput = document.getElementById('target-domain');
  const modelSelection = document.getElementById('model-selection');
  const saveButton = document.getElementById('save-settings');
  const statusMessage = document.getElementById('status-message');

  // Load saved settings
  chrome.storage.sync.get(['apiKey', 'targetDomain', 'modelSelection'], (result) => {
    if (result.apiKey) {
      apiKeyInput.value = result.apiKey;
    }

    if (result.targetDomain) {
      targetDomainInput.value = result.targetDomain;
    } else {
      // Default to Hasura domains
      targetDomainInput.value = 'promptql.console.hasura.io';
    }

    if (result.modelSelection) {
      modelSelection.value = result.modelSelection;
    } else {
      // Default to latest model
      modelSelection.value = 'gpt-3.5-turbo';
    }
  });

  // Save settings when the button is clicked
  saveButton.addEventListener('click', () => {
    const apiKey = apiKeyInput.value.trim();
    const targetDomain = targetDomainInput.value.trim();
    const model = modelSelection.value;

    // Validate inputs
    if (!apiKey) {
      showStatus('API key is required', 'error');
      return;
    }

    // Target domain is optional - will default to Hasura domains
    const finalTargetDomain = targetDomain || 'hasura.app';

    // Save to Chrome storage
    chrome.storage.sync.set({
      apiKey,
      targetDomain: finalTargetDomain,
      modelSelection: model
    }, () => {
      // Show success message
      showStatus('Settings saved successfully!', 'success');

      // Reload any active tabs that match our domains to apply changes
      reloadMatchingTabs(finalTargetDomain);
    });
  });

  // Function to show status messages
  function showStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.className = `status ${type}`;
    statusMessage.style.display = 'block';

    // Hide message after 3 seconds
    setTimeout(() => {
      statusMessage.style.display = 'none';
    }, 3000);
  }

  // Function to reload tabs that match our target domain
  function reloadMatchingTabs(domain) {
    chrome.tabs.query({}, (tabs) => {
      for (const tab of tabs) {
        if (tab.url.includes(domain) ||
          tab.url.includes('hasura.app') ||
          tab.url.includes('hasura.io')) {
          chrome.tabs.reload(tab.id);
        }
      }
    });
  }
}); 