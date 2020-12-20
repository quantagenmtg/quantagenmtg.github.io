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
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  fetch("https://cors-anywhere.herokuapp.com/https://www.cardmarket.com/en/Magic/Cards/Arcane-Signet?language=1&minCondition=2&isSigned=N&isAltered=N", requestOptions)
  .then(response => response.text())
  .then(res => {document.getElementById('demo').innerHTML=res})
  .catch(error => {document.getElementById('demo').innerHTML=error})
}

document.querySelector("button").addEventListener("click", function(){
  ScrapWebsite();
}, false);
