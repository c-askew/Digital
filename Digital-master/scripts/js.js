var tvTitleContainer = document.getElementById('title-name'); 
var tvTimeContainer = document.getElementById('title-time');

var LIST = [];                                                          
window.onload = function () {                                           
    var ourRequest = new XMLHttpRequest();                             
    ourRequest.open('GET', "scripts/test-info.json");             
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

    tvTitleContainer.insertAdjacentHTML('beforeend', htmlStringName); 
    tvTimeContainer.insertAdjacentHTML('beforeend', htmlStringTime); 
                    
}