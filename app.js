let collection = [
  "001.js",
  "002.js",
  "003.js",
  "005.js",
  "004.js",
  "006.js",
  "007.js",
  "008.js",
  "009.js",
  "010.js",
  "011.js",
  "012.js",
];
//
let collectionItem = localStorage.getItem('collectionItem');
collectionItem++;
localStorage.setItem('collectionItem', collectionItem);
if (collectionItem >= collection.length) {
  collectionItem = 0;
  localStorage.setItem('collectionItem', collectionItem);
}
let file = collection[collectionItem];
//
function loadJS(FILE_URL, async = true) {
  let scriptEle = document.createElement("script");

  scriptEle.setAttribute("src", FILE_URL);
  scriptEle.setAttribute("type", "text/javascript");
  scriptEle.setAttribute("async", async);

  document.body.appendChild(scriptEle);

  // success event 
  scriptEle.addEventListener("load", () => {
    console.log("File loaded")
  });
  // error event
  scriptEle.addEventListener("error", (ev) => {
    console.log("Error on loading file", ev);
  });
}

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
if (params.file)
{
    file = params.file;
}
loadJS("./collection/" + file, false);