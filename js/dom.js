var domReady = function(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};
domReady(doGetAlbums());
function doGetAlbums() {
  httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = getResponse;
  httpRequest.open('GET', 'https://lit-fortress-6467.herokuapp.com/object');
  httpRequest.send();
}
function getResponse() {
  if (httpRequest.readyState === 4 && httpRequest.status < 400) {
    var responseObj = JSON.parse(httpRequest.responseText);
    var responseArray = responseObj["results"];
    console.log(responseArray);
// Get 3 unique random numbers
    var random1, random2, random3;
    random1 = Math.floor(Math.random() * (responseArray.length - 1));
    random2 = Math.floor(Math.random() * (responseArray.length - 1));
    random3 = Math.floor(Math.random() * (responseArray.length - 1));
    while (random1 === random2) {
      random2 = Math.floor(Math.random() * (responseArray.length - 1));
    }
    while (random3 === random1 || random3 === random2) {
      random3 = Math.floor(Math.random() * (responseArray.length - 1));
    }
// Add three images based on random numbers
    var el=document.getElementById("random-covers").innerHTML;
    el += `<img id="randomImage1" src="images/${responseArray[random1].cover_art}">`
    el += `<img id="randomImage2" src="images/${responseArray[random2].cover_art}">`
    el += `<img id="randomImage3" src="images/${responseArray[random3].cover_art}">`
    document.getElementById("random-covers").innerHTML = el;
  }
}
