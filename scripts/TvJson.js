var apiURL = "http://api.tvmaze.com/schedule?country=GB" //&date=2018-03-07
var today = moment().format('YYYY-MM-DD');
var tomorrow = moment(today).add(1, 'days').format('YYYY-MM-DD');
var twodays = moment(today).add(2, 'days').format('YYYY-MM-DD');
var threedays = moment(today).add(3, 'days').format('YYYY-MM-DD');
var fourdays = moment(today).add(4, 'days').format('YYYY-MM-DD');
var fivedays = moment(today).add(5, 'days').format('YYYY-MM-DD');

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


function fetchTV (date) {
  document.getElementById('channel-container').innerHTML = "";
  document.getElementById('guide-container').innerHTML = "";

    var dateSchedule = apiURL + "&date=" + date;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var jsonData = JSON.parse(http.responseText);
            // for(i=0; i < jsonData.length; i++) {
            //   if (jsonData[i].show.network.name == null) {
            //     jsonData.splice(i, 1)
            //   }
            // }
            if (jsonData != null) {
              filterData(jsonData);
            }
        }
    };
    http.open('GET', dateSchedule, true);
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
  fillPage(allShows);
};

function fillPage (shows) {
  var channelName = document.getElementById('channel-container');
  var guide = document.getElementById('guide-container');
  for (var i = 0; i < channels.length; i++) {
    var curChannel = shows[i].key;
    // console.log(shows[i]);
    $("<div>", {class: 'channel-container', html: "<h5>"+ curChannel + "</h5>"}).appendTo(channelName);
    $("<div>", {class: 'channel-row dragscroll', id: curChannel}).appendTo(guide);         //Create channel-row div inside the guide id

    for (var s = 0; s < shows[i].values.length; s++ ) {
      // console.log(shows[i].values[s].show.name);
      var channelID = document.getElementById(curChannel)
      var showId = 'c'+ i + 'show' + s; //Creates a unique ID for each show div
      //V Converts and calculates the finish time for each show
      var airTime = shows[i].values[s].airtime;
      var runTime = moment.duration({minutes: shows[i].values[s].runtime});
      var endTime = moment(airTime, "HH:mm").add(runTime);
      var summary = shows[i].values[s].show.summary;
      var cleanSummary = $("<div>").html(summary).text();
      $("<div>", {class: 'show-block', id: showId}).appendTo(channelID)
        .append("<h4 class=\"box-title\">" + shows[i].values[s].show.name + "</h4>")
        .append("<h5 class=\"box-time\">" + airTime + " - " + endTime.format("HH:mm") + "</h5>")
        .append("<p class=\"box-desc\" id=\""+ showId + "desc\">" + cleanSummary + "</p>");
      var truncate = document.getElementById(showId + "desc");
      $clamp(truncate, {clamp: 5});

    }
  }
  dragscroll.reset();
};

function buttonSetup() {
  // var dayArray = [
  //     {id: "showTwoDays", num: 2, btn: twodays},
  //     {id: "showThreeDays", num: 3, btn: threedays},
  //     {id: "showFourDays", num: 4, btn: fourdays},
  //     {id: "showFiveDays", num: 5, btn: fivedays}
  // ]
  // for (i=0; i < dayArray.length; i++){
  //   var dayBtn = document.getElementById(dayArray[i].id)
  //   moment(today).add(2, 'days').format('YYYY-MM-DD');
  //   dayBtn.innerHTML = moment().weekday(dayArray[i].num).format("dddd DD MMMM")
  //   dayBtn.onclick = fetchTV(dayArray[i].btn)
  // }
  $('.dayButton').on('click', function(){
    $('.dayButton').removeClass('selected');
    $(this).addClass('selected');
  });
  document.getElementById('showTwoDays').innerHTML = moment(twodays).format("ddd DD MMMM")
  document.getElementById('showThreeDays').innerHTML  = moment(threedays).format("ddd Do MMMM");
  document.getElementById('showFourDays').innerHTML  = moment(fourdays).format("ddd Do MMMM");
  document.getElementById('showFiveDays').innerHTML  = moment(fivedays).format("ddd Do MMMM");


}

window.onload = function () {
    fetchTV(today);
    buttonSetup();
};
