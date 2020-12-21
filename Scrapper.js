async function ScrapWebsite(url) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  let res; 
  var x = await fetch("https://cors-anywhere.herokuapp.com/"+url, requestOptions)
    .then(response => response.text())
    .then(result => {
      var st = result.search("Available from")+46;
      var end = result.search("€</dd>")-1;
      res = result.substring(st,end);
    })
    .catch(error => {res = 'error'});
  return res;
};

let cardsLP = ['Arcane-Signet', 'Command-Tower'];
let investorLP = ['Lolz', 'Pops'];
let investmentLP = ['1,01','2,00'];
let deliveryfeesLP = ['0,10','0,02'];

window.onload = async function() {
  document.getElementById('table').innerHTML = `<tr>
  <th>Card Name</th>
  <th>Investor</th>
  <th>Investment (Euros)</th>
  <th>Delivery Fees (Euros)</th>
  <th>Current Lowest Price (Euros)</th>
  <th>Profit (Euros)</th>
  <th>Profit Minus Delivery Fees (Euros)</th>
  </tr>`;
  for (i=0; i<cardsLP.length; i++) {
    var cardname = cardsLP[i].replace('-', ' ');
    var cardurl = `https://www.cardmarket.com/en/Magic/Cards/${cardsLP[i]}?language=1&minCondition=2&isSigned=N&isAltered=N`;
    document.getElementById('table').innerHTML += `<tr>
    <td><a href = \'${cardurl}\'>${cardname}</a></td>
    <td>${investorLP[i]}</td>
    <td>${investmentLP[i]}</td>
    <td>${deliveryfeesLP[i]}</td>
    <td id = \'${cardsLP[i]}\'><em>Loading...</em></td>
    <td id = \'${cardsLP[i]}Profit\'><em>Loading...</em></td>
    <td id = \'${cardsLP[i]}ProfitMinus\'><em>Loading...</em></td>
    </tr>`;
  };
  for (i=0; i<cardsLP.length; i++) {
    var cardurl = `https://www.cardmarket.com/en/Magic/Cards/${cardsLP[i]}?language=1&minCondition=2&isSigned=N&isAltered=N`;
    document.getElementById(cardsLP[i]).innerHTML = await ScrapWebsite(cardurl)
  };
  //document.getElementById('test').innerHTML = await ScrapWebsite(cardurl);
};

//document.querySelector("button").addEventListener("click", function(){
//  ScrapWebsite();
//}, false);