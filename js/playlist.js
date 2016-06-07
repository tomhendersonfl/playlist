var domReady = function(callback) {
    document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
};
var responseArray=[], selectedArray=[];
var httpGetRequest, httpPostRequest;
document.getElementById("clear-button").addEventListener("click",doClearPlaylist);
document.getElementById("submit-button").addEventListener("click",doSubmitPlaylist);
// Submit GET request to API when page is loaded
domReady(doAlbumScroll());
function doAlbumScroll() {
  httpGetRequest = new XMLHttpRequest();
  httpGetRequest.onreadystatechange = getAlbums;
  httpGetRequest.open('GET', 'https://lit-fortress-6467.herokuapp.com/object');
  httpGetRequest.send();
}
// Display the albums returned from API call
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
      document.getElementById(imageId).addEventListener("click",doProcessSelection)
    }
  }
}
// Add selected album to bin
function doProcessSelection(e) {
  var el = document.getElementById("cover-list").innerHTML;
  var albumId = e.currentTarget.id;
  albumId = albumId.slice(albumId.indexOf("-")+1);
  if (albumId == selectedArray.filter(function(item) {
    return item === albumId
  })) {
    alert("That album has already been selected")
  } else {
    for (var i = 0; i < responseArray.length; i++) {
      if (responseArray[i].id == albumId) {
        el += `<li>${responseArray[i].title}</li>`
        selectedArray.push(albumId);
        document.getElementById("cover-list").innerHTML = el;
      }
    }
  }
}
// Clear all the albums in the bin and the selected array
function doClearPlaylist() {
  document.getElementById("cover-list").innerHTML = "";
  selectedArray = [];
}
// Submit Post request to save Playlist
function doSubmitPlaylist() {
  httpPostRequest = new XMLHttpRequest();
  httpPostRequest.onreadystatechange = getPostResponse;
  httpPostRequest.open('POST', 'https://lit-fortress-6467.herokuapp.com/post');
  httpPostRequest.send();
}
// Display response from Post request & clear selected albums
function getPostResponse() {
  if (httpPostRequest.readyState === 4 && httpPostRequest.status < 400) {
    doClearPlaylist()
    alert(httpPostRequest.responseText)
  }
}
