// waits for the button click in the popup
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    // finds all video elements on the page and extracts the src attribute
    const videos = document.querySelectorAll("video");
    let links = [];
    if (videos && videos.length > 0) videos.forEach((v) => links.push(v.src));
    sendResponse(links);
  }
);