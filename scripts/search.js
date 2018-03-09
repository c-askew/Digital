var apiURL = "https://api.themoviedb.org/3/search/multi?api_key=5d63acb8dda43fa93c2d2fde5b0d32bf&language=en-GB&include_adult=false&query=";
var imageURL = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/"
var backdropURL = "https://image.tmdb.org/t/p/w1400_and_h450_face/"

function parseQuery() {
  var queryString = window.location.search;
  var query = queryString.split('=')[1];
  var sendQuery = apiURL + query;
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
  var results = data.results;
  console.log(results)
  var resultsContainer = document.getElementById('results-container');
  var imageContainer = document.getElementById('query-image');
  var infoContainer = document.getElementById('query-info');

  for (var i = 0; i < results.length; i++ ) {
    var curResult = 'result' + i;
    if (results[i].hasOwnProperty('title') ? name = results[i].title : name = results[i].name);
    console.log(name)

    $("<div>", {class: 'resultBlock', id: curResult}).appendTo(resultsContainer)

      var resultEl = document.getElementById(curResult);
    $("<div>", {class: 'query-image', id: 'query-image'+i}).appendTo(resultEl)

    $("<div>", {class: 'query-info', id: 'query-info'+i}).appendTo(resultEl)
      .append("<h4 class=\"box-title\">" + name + "</h4>")
    }

  // $("<img class=\"mediaImage\" src=\"" + data.Poster + "\" />").appendTo(imageContainer)
  // $("<h1 class=\"mediaTitle\">" + data.Title + "</h1>" + "<h3> (" + data.Year + ") | Runtime: " + data.Runtime + ") | Rated: " + data.Rated +"</h3>").appendTo(infoContainer)
  // $("<h2 class=\"mediaPlot\">" + data.Plot + "</h2>").appendTo(infoContainer)
  //
  // $("<h4 class=\"mediaGenre\">" + data.Genre + "</h4>").appendTo(infoContainer)
  // $("<h4 class=\"mediaActors\">" + data.Actors + "</h4>").appendTo(infoContainer)
  // $("<h4 class=\"mediaWriters\"> Written By: " + data.Writer + "</h4>").appendTo(infoContainer)
  // $("<h4 class=\"mediaAwards\">" + data.Awards + "</h4>").appendTo(infoContainer)
  // $("<h4 class=\"mediaRating\"> Rated " + data.imdbRating + " on IMDb </h4>").appendTo(infoContainer)
  }


window.onload = function () {
  parseQuery();
};
