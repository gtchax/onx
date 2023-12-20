chrome.tabs.onUpdated.addListener(function (_, changeInfo, tab) {
  function getTabId() {
    return tab.id;
  }
  if (changeInfo.status == "complete") {
    chrome.scripting
      .executeScript({
        target: { tabId: getTabId() },
        files: ["paste.js"],
      })
      .then(() => console.log("working"));
  }
});
