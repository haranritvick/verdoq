chrome.runtime.onMessage.addListener((request: any, _sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void) => {
  if (request.type === 'SCRAPE_TEXT') {
    // Attempt to extract the main readable text of the page
    // For a real extension, we might use Readability.js or similar.
    // Here we'll do a simple scraping of body's innerText (up to 30000 chars)
    
    let text = document.body.innerText || '';
    
    // Strip empty lines and extra spaces
    text = text.replace(/\n\s*\n/g, '\n').trim();
    
    // Cap to a sensible length for payload size
    if (text.length > 30000) {
      text = text.slice(0, 30000);
    }
    
    sendResponse({ text });
  }
  return true; // Keep message channel open for async
});
