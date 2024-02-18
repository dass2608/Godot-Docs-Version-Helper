browser.runtime.onMessage.addListener((message) => {
  console.log("Got message with targetBranch of " + message.targetBranch)
  offerBranchChange(message.targetBranch);
})

function offerBranchChange(targetBranch) {
  let oldElem = document.getElementById("godot-docs-version-helper-change-offer")
  if (oldElem)
    oldElem.remove();
  let elem = document.createElement("div");
  elem.id = "godot-docs-version-helper-change-offer";
  elem.innerHTML = `<a id="godot-docs-version-helper-change-offer-text" style="color:red;" href="${getUrlWithChangedBranchName(targetBranch)}">Change to ${targetBranch}-branch?</a>`
  elem.style.position = "fixed";
  elem.style.top = "0px";
  elem.style.right = "5%";
  console.log(elem);
  
  const parent = document.getElementsByClassName("wy-nav-content-wrap")[0];
  if (parent)
    parent.appendChild(elem);
  else {
    console.error("Godot Docs Version Helper: Was not able to find element with class name wy-nav-content-wrap");
  }
}

function getCurrentBranch() {
  return document.location.pathname.split("/")[2];
}

function getUrlWithChangedBranchName(targetBranch) {
  let pathArray = document.location.pathname.split("/");
  pathArray[2] = targetBranch;
  return pathArray.join("/");
}

function changeToBranch(targetBranch) {
  document.location.pathname = getUrlWithChangedBranchName(targetBranch);
}

function onLoad() {  
  browser.storage.local.get("targetBranch")
  .then((storage) => {
    if (storage.targetBranch && storage.targetBranch != getCurrentBranch())
      offerBranchChange(storage.targetBranch);
  })
  .catch(console.error)
}

onLoad();
