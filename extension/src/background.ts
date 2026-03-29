// Service worker for background execution.
// Can be used to sync JWT tokens from the Verdoq web app, 
// store them securely in chrome.storage, and proxy API requests.

chrome.runtime.onInstalled.addListener(() => {
  console.log('Verdoq extension installed.');
});

// Example listener for future cross-tab communication
chrome.runtime.onMessageExternal.addListener(
  (request: any, _sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
    // E.g. web app sends JWT token to extension
    if (request.type === 'SYNC_TOKEN') {
      chrome.storage.local.set({ verdoq_token: request.token }, () => {
        sendResponse({ success: true });
      });
    }
    return true;
  }
);
