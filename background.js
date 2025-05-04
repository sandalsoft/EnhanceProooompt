// Listen for installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('ProomptQL Enhancer extension installed');

  // Set default options
  chrome.storage.sync.get(['apiKey', 'targetDomain', 'modelSelection'], (result) => {
    // Only set defaults if they don't exist
    const defaults = {};

    if (!result.modelSelection) {
      defaults.modelSelection = 'gpt-3.5-turbo';
    }

    if (!result.targetDomain && Object.keys(defaults).length > 0) {
      // Default target domains if none set
      defaults.targetDomain = 'hasura.app';
    }

    if (Object.keys(defaults).length > 0) {
      chrome.storage.sync.set(defaults);
    }
  });
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkPermissions') {
    const url = sender.tab.url;
    chrome.storage.sync.get('targetDomain', (result) => {
      // Check if on target domain or a known Hasura domain
      const onTargetDomain = result.targetDomain && url.includes(result.targetDomain);
      const onHasuraDomain = url.includes('hasura.app') || url.includes('hasura.io');

      if (onTargetDomain || onHasuraDomain) {
        sendResponse({ allowed: true });
      } else {
        sendResponse({ allowed: false });
      }
    });
    return true; // Required for async sendResponse
  }
}); 