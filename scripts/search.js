var apiKey = "5d63acb8dda43fa93c2d2fde5b0d32bf";
var apiURL = "https://api.themoviedb.org/3/search/multi?api_key=" + apiKey +"&language=en-GB&include_adult=false&query=";
var imageURL = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/";
var backdropURL = "https://image.tmdb.org/t/p/w1400_and_h450_face/";
var genreAPI = "https://api.themoviedb.org/3/genre/tv/list?api_key=" + apiKey + "&language=en-GB";
var tvDetails = "https://api.themoviedb.org/3/" +  + "tv/list?api_key=" + apiKey + "&language=en-GB";
var fullDetails = {};


function parseQuery() {
  fullDetails = {};
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

  if (results.length > 10 ? count = 10 : count = results.length);
  for (var i = 0; i < count; i++ ) {
    //Collecting Values
    var curResult = 'result' + i;
    if (results[i].hasOwnProperty('title') ? name = results[i].title : name = results[i].name);
    if (results[i].poster_path != null ? posterImage = imageURL + results[i].poster_path : posterImage = "/assets/phPoster.jpg");
    var posterImage = imageURL + results[i].poster_path;
    var backdropImage = backdropURL + results[i].backdrop_path;

    //Dig Deeper
    var showID = results[i].id;
    var type = results[i].media_type;
    var deepDetails = "https://api.themoviedb.org/3/"+ type + "/" + showID + "?api_key=" + apiKey + "&language=en-GB";
    var fetchAllDetails = { "async": true, "crossDomain": true, "url": deepDetails, "method": "GET", "headers": {}, "data": "{}" };

    $.ajax(fetchAllDetails).done(function (response) {
      fullDetails[i] = response;
      console.log(fullDetails);
    });







    //Apply Backdrop Image
    $("<div>", {class: 'result-block', id: curResult}).appendTo(resultsContainer)
      .css({'background-image': 'radial-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9), rgba(0,0,0,1)), url(' + backdropImage + ')','background-size':'120vw'})

    var resultEl = document.getElementById(curResult);

    $("<div>", {class: 'query-image', id: 'query-image'+i}).appendTo(resultEl)
      .append("<img src=\""+ posterImage +"\">")
      //Apply Poster
    if (results[i].poster_path != null) { $("query-image"+i).css('background-image', 'url(' + backdropImage + ')') }
    $("<div>", {class: 'query-info', id: 'query-info'+i}).appendTo(resultEl)
      .append("<h1 class=\"box-title\">" + name + "</h1>")
      .append("<h3 class=\"box-title\">" + name + "</h3>")
      .append("<h2 class=\"box-summary\">" + results[i].overview + "</h2>")
      .append("<h4 class=\"box-more\">" + name + "</h4>")
    }
  }


window.onload = function () {
  parseQuery();
};
