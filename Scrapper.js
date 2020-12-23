async function ScrapWebsite(url) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  let res; 
  var x = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      var st = result.search("Available from")+48;
      var end = result.search("€</dd>")-1;
      res = result.substring(st,end);
    })
    .catch(error => {res = 'error'});
  return res;
};

let cardsLP = ['Gaeas-Cradle','Savannah','Tropical Island','Tundra','Badlands','Power-Artifact','Lake-of-the-Dead','Survival-of-the-Fittest','Earthcraft','Lions-Eye-Diamond','Null-Rod','Time-Spiral','Squandered-Resources','Academy-Rector','Yawgmoths-Will','Rofellos-Llanowar-Emissary','Gilded-Drake','Palinchron','Intuition'];
let investorLP = ['Patrick','Patrick','Patrick','Patrick','Patrick','Lionel', 'Lionel','Lionel','Lionel','Lionel','Lionel','Lionel','Lionel','Lionel','Lionel','Lionel','Lionel','Lionel','Lionel'];
let investmentLP = ['515.00','210.00','380.00','250.00','268.99','182.99','45.00','145.00','80.00','299.00','45.00','89.95','14.50','59.00','100.00','19.97','165.00','28.00','99.95'];
let deliveryfeesLP = ['18.48','14.07','16.00','16.00','12.20','7.99','5.95','9.53','9.95','16.49','6.70','5.99','1.70','4.00', '14.20','11.30','13.58','5.64','15.49'];

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
    var cardname = cardsLP[i].replaceAll('-', ' ');
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
  var netInvestmentLP = 0.;
  var netDeliveryFeesLP = 0.;
  var netCurLowPriceLP = 0.;
  for (i=0; i<cardsLP.length; i++) {
    netInvestmentLP += parseFloat(investmentLP[i]);
    netDeliveryFeesLP += parseFloat(deliveryfeesLP[i]);
    var cardurl = `https://www.cardmarket.com/en/Magic/Cards/${cardsLP[i]}?language=1&minCondition=2&isSigned=N&isAltered=N`;
    var curprice = await ScrapWebsite(cardurl);
    curprice = curprice.replace(',','.');
    document.getElementById(cardsLP[i]).innerHTML = curprice;
    netCurLowPriceLP += parseFloat(curprice);
    var profit = parseFloat(curprice) - parseFloat(investmentLP[i]);
    if (profit > 0) {
      document.getElementById(cardsLP[i]+'Profit').innerHTML = profit.toFixed(2);
      document.getElementById(cardsLP[i]+'Profit').style.color = "green"
    } else {
      document.getElementById(cardsLP[i]+'Profit').innerHTML = profit.toFixed(2);
      document.getElementById(cardsLP[i]+'Profit').style.color = "red"
    };
    var profitminus = profit - parseFloat(deliveryfeesLP[i]);
    if (profitminus > 0) {
      document.getElementById(cardsLP[i]+'ProfitMinus').innerHTML = profitminus.toFixed(2);
      document.getElementById(cardsLP[i]+'ProfitMinus').style.color = "green"
    } else {
      document.getElementById(cardsLP[i]+'ProfitMinus').innerHTML = profitminus.toFixed(2);
      document.getElementById(cardsLP[i]+'ProfitMinus').style.color = "red"
    };
  };
  var netProfitLP = netCurLowPriceLP - netInvestmentLP;
  var netProfitMinDelFeesLP = netProfitLP - netDeliveryFeesLP;
  document.getElementById('netInvestmentLP').innerHTML = netInvestmentLP.toFixed(2);
  document.getElementById('netDelFeesLP').innerHTML = netDeliveryFeesLP.toFixed(2);
  document.getElementById('netCurLowPriceLP').innerHTML = netCurLowPriceLP.toFixed(2);
  if (netProfitLP > 0) {
    document.getElementById('netProfitLP').innerHTML = netProfitLP.toFixed(2);
    document.getElementById('netProfitLP').style.color = "green"
  } else {
    document.getElementById('netProfitLP').innerHTML = netProfitLP.toFixed(2);
    document.getElementById('netProfitLP').style.color = "red"
  };
  if (netProfitMinDelFeesLP > 0) {
    document.getElementById('netDelFeesMinLP').innerHTML = netProfitMinDelFeesLP.toFixed(2);
    document.getElementById('netDelFeesMinLP').style.color = "green"
  } else {
    document.getElementById('netDelFeesMinLP').innerHTML = netProfitMinDelFeesLP.toFixed(2);
    document.getElementById('netDelFeesMinLP').style.color = "red"
  };

};

//document.querySelector("button").addEventListener("click", function(){
//  ScrapWebsite();
//}, false);