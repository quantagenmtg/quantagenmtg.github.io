function getthefucknwebsite2POST() {
  let acturl = 'https://en.wikipedia.org/wiki/Web_scraping';
  let url = `https://proxybot.io/api/v1/s3MxG9sFddfgxio6Ok6KmomgYdr1?render_js=true&url=${acturl}`;

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
  var raw = [
    {
      "selector": "#firstHeading",
      "get": "text"
    },
    {
      "selector": "#siteSub",
      "get": "text"
    }
  ];

  var requestOptions = {
    method: 'POST',
    body: raw,
    redirect: 'follow'
  };

  fetch("https://proxybot.io/api/v1/s3MxG9sFddfgxio6Ok6KmomgYdr1?url=https://en.wikipedia.org/wiki/Web_scraping", requestOptions)
    .then(response => response.text())
    .then(res => {document.getElementById('demo').innerHTML=res})
    .catch(error => {document.getElementById('demo').innerHTML=error});
}

document.querySelector("button").addEventListener("click", function(){
  ScrapWebsite();
}, false);
