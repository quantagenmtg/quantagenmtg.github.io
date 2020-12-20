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
  var data = "[\r\n  {\r\n    \"selector\": \"#firstHeading\",\r\n    \"get\": \"text\"\r\n  },\r\n  {\r\n    \"selector\": \"#siteSub\",\r\n    \"get\": \"text\"\r\n  }\r\n]";

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      {document.getElementById('demo').innerHTML=this.responseText};
    }
  });
  
  xhr.open("POST", "https://proxybot.io/api/v1/s3MxG9sFddfgxio6Ok6KmomgYdr1?url=https://en.wikipedia.org/wiki/Web_scraping");
  
  xhr.send(data);
}

document.querySelector("button").addEventListener("click", function(){
  ScrapWebsite();
}, false);
