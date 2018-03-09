var url = "http://www.omdbapi.com/?t=";
var apikey = "&apikey=4360f00d";

function parseQuery() {
  var queryString = window.location.search ;
  var query = queryString.split('=')[1];
  var sendQuery = url + query + apikey;
  fetchData(sendQuery);
};

function fetchData (sendQuery) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var jsonData = JSON.parse(http.responseText);
            if (jsonData != null) {
              console.log(jsonData)
              displayData(jsonData);
            }
        }
    };
    http.open('GET', sendQuery, true);
    http.send();
};

function displayData(data) {
  var imageContainer = document.getElementById('query-image');
  var infoContainer = document.getElementById('query-info');
  $("<img class=\"mediaImage\" src=\"" + data.Poster + "\" />").appendTo(imageContainer)
  $("<h1 class=\"mediaTitle\">" + data.Title + "</h1>" + "<h3> (" + data.Year + ") | Runtime: " + data.Runtime + ") | Rated: " + data.Rated +"</h3>").appendTo(infoContainer)
  $("<h2 class=\"mediaPlot\">" + data.Plot + "</h2>").appendTo(infoContainer)

  $("<h4 class=\"mediaGenre\">" + data.Genre + "</h4>").appendTo(infoContainer)
  $("<h4 class=\"mediaActors\">" + data.Actors + "</h4>").appendTo(infoContainer)
  $("<h4 class=\"mediaWriters\"> Written By: " + data.Writer + "</h4>").appendTo(infoContainer)
  $("<h4 class=\"mediaAwards\">" + data.Awards + "</h4>").appendTo(infoContainer)
  $("<h4 class=\"mediaRating\"> Rated " + data.imdbRating + " on IMDb </h4>").appendTo(infoContainer)
  }

window.onload = function () {
  parseQuery();


};
