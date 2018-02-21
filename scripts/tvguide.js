var request = new XMLHttpRequest();

request.open('GET', 'http://www.xmltv.co.uk/feed/6461');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

request.send();


