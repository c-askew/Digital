var apiKey = "5d63acb8dda43fa93c2d2fde5b0d32bf";
var apiURL = "https://api.themoviedb.org/3/search/multi?api_key=" + apiKey +"&language=en-GB&include_adult=false&query=";
var imageURL = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/";
var backdropURL = "https://image.tmdb.org/t/p/w1400_and_h450_face/";
var genreAPI = "https://api.themoviedb.org/3/genre/tv/list?api_key=" + apiKey + "&language=en-GB";
var tvDetails = "https://api.themoviedb.org/3/" +  + "tv/list?api_key=" + apiKey + "&language=en-GB";



function parseQuery() {
  fullDetails = {};
  var queryString = window.location.search;
  var query = queryString.split('=')[1];
  var sendQuery = apiURL + query;
  fetchData(sendQuery);
};

//Get's initial search results
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

function displayData(mediaData) {
  var results = mediaData.results;
  console.log(results)
  var resultsContainer = document.getElementById('results-container');
  var fullDetails = {};


  if (results.length > 10 ? count = 10 : count = results.length);
  for (var i = 0; i < count; i++ ) {
    //Collecting Values
    var curResult = 'result' + i;
    if (results[i].hasOwnProperty('title') ? name = results[i].title : name = results[i].name); //Grab name or title
    if (results[i].poster_path != null ? posterImage = imageURL + results[i].poster_path : posterImage = "/assets/phPoster.jpg");
    var posterImage = imageURL + results[i].poster_path;
    var backdropImage = backdropURL + results[i].backdrop_path;

    //Expand search results with more details
    var showID = results[i].id;
    var type = results[i].media_type;
    var deepDetails = "https://api.themoviedb.org/3/"+ type + "/" + showID + "?api_key=" + apiKey + "&language=en-GB&append_to_response=videos,images,reviews";

    $.ajax({
    type: 'GET',
    url: deepDetails,
    async: false, //***
    data: {},
    dataType: 'json',
    success: function (data) { fullDetails[i] = data; }
    });

    var genres = fullDetails[i].genres[0].name;
      if (fullDetails[i].genres.length > 1 ) {
        for (c = 1; c < fullDetails[i].genres.length; c++) {
          genres += " | " + fullDetails[i].genres[c].name;
      }
    }

    var runtime = fullDetails[i].runtime;
    var score = fullDetails[i].vote_average;
    var imdb = "http://www.imdb.com/title/" + fullDetails[i].imdb_id;
    var imdbLink = "<a href=\" " + imdb + " \" class=\"imdblink\">View on IMDb</a>";



    //Apply Backdrop Image
    $("<div>", {class: 'result-block', id: curResult}).appendTo(resultsContainer)
      .css({'background-image': 'radial-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9), rgba(0,0,0,1)), url(' + backdropImage + ')','background-size':'cover'})

    var resultEl = document.getElementById(curResult);

    $("<div>", {class: 'query-image', id: 'query-image'+i}).appendTo(resultEl)
      .append("<img src=\""+ posterImage +"\">")
      //Apply Poster
    if (results[i].poster_path != null) { $("query-image"+i).css('background-image', 'url(' + backdropImage + ')') }
    $("<div>", {class: 'query-info', id: 'query-info'+i}).appendTo(resultEl)
      .append("<h1 class=\"box-title\">" + name + "</h1>")
      .append("<h3 class=\"box-genre\">" + genres + "</h3>")
      .append("<h3 class=\"box-runtime\"id=\"runtime"+i+"\"> Runtime: " + runtime + "m</h3>")
      .append("<h2 class=\"box-summary\">" + results[i].overview + "</h2>")
      .append("<h4 class=\"box-score\"> Viewer Score: " + score + "</h4>")
      .append("<h4 class=\"box-link\">" + imdbLink + "</h4>")
      if (type == 'tv') { $("#runtime"+i).remove() }
    }
    console.log(fullDetails)
  }



window.onload = function () {
  parseQuery();
};
