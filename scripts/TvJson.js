var apiURL = "http://api.tvmaze.com/schedule?country=GB&date=2018-03-06" //&date=2018-03-07
var channels = [
  {id: 'BBC One'},
  {id: 'BBC Two'},
  {id: 'ITV'},
  {id: 'Channel 4'},
  {id: 'Channel 5'},
  {id: 'Really'},
  {id: 'E4' }
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
              console.log(jsonData);
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
  console.log(showsByChannel)

  for (i=0; i < data.length; i++) {
    // console.log(data[i].show.network.name);
    var showData = data[i].show;
    var networkData = showData.network;

  }
};


window.onload = function () {
    fetchTV();
}
