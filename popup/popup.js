// add event listener to the find button because inline event listeners are blocked by content security policy
document.getElementById('find-button').addEventListener('click', findVideoSources);

// send message to the content script which looks for video sources on the page and returns a list of links
function findVideoSources() {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, null, (response) => {
      displayLinks(response);
    });
  });
}

// displays the list of links in the popup html
function displayLinks(links) {
  if (links && links.length > 0) {
    const videoList = document.getElementById('video-list');
    videoList.innerHTML = '';
    
    links.forEach(l => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = l;
      link.innerText = l;
      link.target = '_blank';
      listItem.appendChild(link);
      videoList.appendChild(listItem);
    });
  
    document.getElementById('no-videos').hidden = true;
  } else {
    document.getElementById('no-videos').hidden = false;
  }
}