let collection = [
  "001.js",//circle color black
  "002.js",//stairs yellow all over
  "004.js",//ants black circular
  "005.js",//fractal build up from top
  "003.js",//circle white petals 
  "007.js",//circular black particles
  "008.js",//black 3d
  "006.js",//cubes cray
  "010.js",//circular stripes black
  "009.js",//white all over stripes
  "011.js",//circular orbit 3d black
  "012.js",//sketch white
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
if (params.file) {
  file = params.file;
}
loadJS("./collection/" + file, false);

async function loadSourceCode() {
  const response = await fetch("./collection/" + file);
  const data = await response.text();
  var elemDiv = document.createElement('div');
  elemDiv.innerHTML = '<pre id="preSourceCode"><code id="sourceCode" class="language-javascript"></code></pre>';
  document.body.appendChild(elemDiv);
  document.getElementById("sourceCode").innerHTML = data;
  hljs.highlightAll();
}

setTimeout(loadSourceCode, 1000); 