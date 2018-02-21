var tvTitleContainer = document.getElementById('title-name'); 

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
        htmlStringName += "<p>"+ data[i].name + "</p>"       
    }
    var htmlStringTime = "";                                                                
    for (i = 0; i < data.length; i++) {                                                   
        htmlStringTime += "<p>"+ data[i].time + "</p>"       
    }

    tvTitleContainer.insertAdjacentHTML('beforeend', htmlStringName); 
                    
}