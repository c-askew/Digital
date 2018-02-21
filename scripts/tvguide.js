var request = new XMLHttpRequest();

request.open('GET', 'http://api.tvlive.io/tvcontent/channel/CHANNEL ONE/current');

request.setRequestHeader('Authorization', '0123456789');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

request.send();
