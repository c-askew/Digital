var url = 'https://newsapi.org/v2/everything?' +
'q=film OR movie OR television OR actor OR netflix OR amazon-prime-video NOT daily-deals &' +
'sources=engadget,entertainment-weekly,daily-mail,ign&' +
'sortBy=popularity&' +
'language=en&' +
'apiKey=c1cc11baad674238bd0cfe849da4924b';


var req = new Request(url);

var newsData = {};

function fetchNews () {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var jsonData = JSON.parse(http.responseText);
            if (jsonData != null) {
                newsData = jsonData.articles
                console.log(newsData);
                listNews(newsData);
            }
        }
    };
    http.open('GET', url, true);
    http.send();
};

function listNews(news) {
    var newsgrid = document.getElementById('news-grid');
    for (var i = 0, type = 1; i < newsData.length; i++, type++) {
      var articleLink = "<a href=\""+news[i].url+"\">Read More...</a>"
      $("<div>", {id: 'newsItem'+i, class:'grid-item type'+ type })  //Creates the div for the news item - implements type count to apply the differing colour types with CSS
        .append("<h2>" + news[i].title + "</h2>")
        .append("<img src=\"" + news[i].urlToImage +"\"/>")
        .append("<p>" + news[i].description + "</p>")
        .append("<p class=\"news-link\">"+ articleLink +"</p>")
        .appendTo(newsgrid)
        if (type == 3) { type = 0 };      //Controls the colouring
    }
    // layout Isotope after each image loads
      $('#news-grid').imagesLoaded().done( function(instance) {
        $('#news-grid').isotope({
          itemSelector: '.grid-item',
          percentPosition: true,
          masonry: {
            columnWidth: '.grid-sizer',
            gutter: '.gutter-sizer'
          }
          });
        });
};

window.onload = function () {
  fetchNews();
}
