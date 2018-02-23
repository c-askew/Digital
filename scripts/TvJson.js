var tvTimeContainer = document.getElementById('title-time');
var tvDescContainer = document.getElementById('title-desc');
var tvTitleContainer = document.getElementById('title-name'); 

var LIST = [];                                                          
window.onload = function () {                                           
    var ourRequest = new XMLHttpRequest();                             
    ourRequest.open('GET', "data/tv-data.json");             
    ourRequest.onload = function () {                                   
        var ourData = JSON.parse(ourRequest.responseText);              
        renderHTML(ourData);                                            
    };
    ourRequest.send();                                                                                                     
}                                                                      

function renderHTML(data) {                                                       
    var htmlStringName = "";                                                                
    for (i = 0; i < data.length; i++) {                                                   
        htmlStringName += data[i].name     
    }
    var htmlStringTime = "";                                                                
    for (i = 0; i < data.length; i++) {                                                   
        htmlStringTime += data[i].time     
    }
    var htmlStringDesc = "";                                                                
    for (i = 0; i < data.length; i++) {                                                   
        htmlStringDesc += data[i].desc       
    }      

    tvTitleContainer.insertAdjacentHTML('beforeend', htmlStringName); 
    tvTimeContainer.insertAdjacentHTML('beforeend', htmlStringTime); 
    tvDescContainer.insertAdjacentHTML('beforeend', htmlStringDesc);     
}