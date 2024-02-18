const versionSelector = document.getElementById("target-branch");

function changeTargetBranchClosure(targetBranch) {
  return function changeTargetBranch(tabs) {
    browser.tabs.sendMessage(tabs[0].id, { targetBranch: targetBranch });
  }
}

versionSelector.addEventListener("change", (_) => {
  const value = versionSelector.value;
  browser.storage.local.set({ "targetBranch": value });
  browser.tabs.query({ active: true, currentWindow: true })
    .then(changeTargetBranchClosure(value))
    .catch(console.error)
});

browser.storage.local.get("targetBranch")
  .then((storage) => {
    if (!storage.targetBranch) {
      console.warn("Target Branch was: ", storage.targetBranch);
      return
    }
    versionSelector.value = storage.targetBranch
  })
