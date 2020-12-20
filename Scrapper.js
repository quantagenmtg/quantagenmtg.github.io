function getthefucknwebsite2POST() {
  let acturl = 'https://en.wikipedia.org/wiki/Web_scraping';

  var raw = "[\r\n  {\r\n    \"selector\": \"#firstHeading\",\r\n    \"get\": \"text\"\r\n  },\r\n  {\r\n    \"selector\": \"#siteSub\",\r\n    \"get\": \"text\"\r\n  }\r\n]";

  var requestOptions = {
    method: 'POST',
    body: raw
  };

  fetch(url, requestOptions)
  .then(response => response.json())
  .then(res => console.log(res))
  .catch(error => console.log(error))
};

function ScrapWebsite() {
  let url = 'https://en.wikipedia.org/wiki/Web_scraping';
  fetch(url)
  .then(response => response.text())
  .then(res => {document.getElementById('demo').innerHTML=res})
  .catch(error => {document.getElementById('demo').innerHTML=error})
}

document.querySelector("button").addEventListener("click", function(){
  ScrapWebsite();
}, false);
