var apiURL = "http://api.tvmaze.com/schedule?country=GB" //&date=2018-03-07
var channels = [
  {key: 'BBC One'},
  {key: 'BBC Two'},
  {key: 'ITV'},
  {key: 'Channel 4'},
  {key: 'Channel 5'},
  {key: 'Really'},
  {key: 'E4' }
];

/*Fetch Data
  Fetch Channels
  Create row for a channel
  Match channel to data entry
  For Loop for each entry - create programme box per Loop
*/


function fetchTV () {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var jsonData = JSON.parse(http.responseText);
            if (jsonData != null) {
              // console.log(jsonData);
              filterData(jsonData);
            }
        }
    };
    http.open('GET', apiURL, true);
    http.send();
};

function filterData (data) {
  var showsByChannel = d3.nest()
  .key(function(d) { return d.show.network.name; })
  .entries(data);
  // console.log(showsByChannel)
  for (i=0; i < data.length; i++) {
    // console.log(data[i].show.network.name);
    var showData = data[i].show;
    var networkData = showData.network;
  };
  var allShows = _.chain(channels)
      .pairs()
      .map(function (i) { return showsByChannel[i[0]]; })
      .value();
  console.log(allShows);
  fillPage(allShows);
};

function fillPage (shows) {
  var channelName = document.getElementById('channel-container');
  var guide = document.getElementById('guide-container');
  for (var i = 0; i < channels.length; i++) {
    var curChannel = shows[i].key;
    // console.log("curChannel is " + curChannel);
    console.log(shows[i]);
    $("<div>", {class: 'channel-container', html: "<h5>"+ curChannel + "</h5>"}).appendTo(channelName); 
    $("<div>", {class: 'channel-row dragscroll', id: curChannel}).appendTo(guide);         //Create channel-row div inside the guide id

    for (var s = 0; s < shows[i].values.length; s++ ) {
      // console.log(shows[i].values[s].show.name);
      var channelID = document.getElementById(curChannel)
      var showId = 'c'+ i + 'show' + s; //Creates a unique ID for each show div
      $("<div>", {class: 'show-block', id: showId}).appendTo(channelID)
        .append("<h4 class=\"box-title\">" + shows[i].values[s].show.name + "</h4>")
        .append("<h5 class=\"box-time\">" + shows[i].values[s].airtime + "   - Runtime: " + shows[i].values[s].runtime + "m</h5>")
        .append("<p class=\"box-boxdesc\">" + shows[i].values[s].show.summary + "</p>")


    }

  }
  dragscroll.reset();
};


window.onload = function () {
    fetchTV();
};
