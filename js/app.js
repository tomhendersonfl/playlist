//
// document.getElementById("searchButton").addEventListener("click",doSearch);
//
// function doSearch() {
//   var string = document.getElementById("searchString").value
//   httpRequest = new XMLHttpRequest();
//   httpRequest.onreadystatechange = processRequest;
//   httpRequest.open('GET', 'http://www.omdbapi.com/?s=' + string);
//   httpRequest.send();
//   console.log(httpRequest);
// }
//
// function processRequest() {
//   if (httpRequest.readyState === 4 && httpRequest.status < 400) {
//     document.getElementById("showResults").innerHTML = " ";
//     var responseObj = JSON.parse(httpRequest.responseText);
//     var el=document.getElementById("showResults").innerHTML;
//     if (responseObj["Response"] === "False") {
//       el += "There are no movie titles that match your selection";
//     } else {
//       var responseArray = responseObj["Search"];
//       el += "The following movie titles match your selection:";
//       el += "<ul>";
//       for (var i = 0; i < responseArray.length; i++) {
//         var imageURL = '"'+responseArray[i]["Poster"]+'"';
//         el += `<li><a href=${imageURL} target="_blank">${responseArray[i]["Title"]}</a></li>`;
//       }
//       el += "</ul>"
//     }
//     document.getElementById("showResults").innerHTML = el;
//   }
// }
