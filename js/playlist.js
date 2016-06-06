var domReady = function(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};
var responseArray=[];
var httpGetRequest, httpPostRequest;
domReady(doAlbumScroll());
document.getElementById("clear-button").addEventListener("click",doClearPlaylist);
document.getElementById("submit-button").addEventListener("click",doSubmitPlaylist);
function doAlbumScroll() {
  httpGetRequest = new XMLHttpRequest();
  httpGetRequest.onreadystatechange = getAlbums;
  httpGetRequest.open('GET', 'https://lit-fortress-6467.herokuapp.com/object');
  httpGetRequest.send();
}
function getAlbums() {
  if (httpGetRequest.readyState === 4 && httpGetRequest.status < 400) {
    var responseObj = JSON.parse(httpGetRequest.responseText);
    responseArray = responseObj["results"];
    var el=document.getElementById("cover-scroll").innerHTML;
    for (var i=0; i<responseArray.length; i++) {
      el += `<img class="scrolling-image" id="cover-${responseArray[i].id}" src="images/${responseArray[i].cover_art}">`
    }
    document.getElementById("cover-scroll").innerHTML = el;

    for (var i=0; i<responseArray.length; i++) {
      var imageId = `cover-${responseArray[i].id}`
      console.log(imageId);
      document.getElementById(imageId).addEventListener("click",doProcessSelection)
    }
  }
}

function doProcessSelection(e) {
// Add selected album to bin
  console.log("current target: " + e.currentTarget);
  var el = document.getElementById("cover-list").innerHTML;
  console.log("el: "+el)
  var albumId = e.currentTarget.id;
  albumId = albumId.slice(albumId.indexOf("-")+1);
  console.log("album id: "+albumId+", type: "+typeof albumId)
  console.log("array id: "+responseArray[0].id+", type: "+typeof responseArray[0].id);
  for (var i = 0; i < responseArray.length; i++) {
    if (responseArray[i].id == albumId) {
      el += `<li>${responseArray[i].title}</li>`
    }
  }
  document.getElementById("cover-list").innerHTML = el;
}
function doClearPlaylist() {
// Clear all the albums in the bin
  document.getElementById("cover-list").innerHTML = "";
}

function doSubmitPlaylist() {
// Submit Post request to save Playlist
  console.log("Submit Playlist");
  httpPostRequest = new XMLHttpRequest();
  httpPostRequest.onreadystatechange = getPostResponse;
  httpPostRequest.open('POST', 'https://lit-fortress-6467.herokuapp.com/post');
  httpPostRequest.send();
}
function getPostResponse() {
  console.log(httpPostRequest.readyState, httpPostRequest.status);
  if (httpPostRequest.readyState === 4 && httpPostRequest.status < 400) {
    console.log(httpPostRequest.responseText);
    doClearPlaylist()
    alert(httpPostRequest.responseText)
  }
}
