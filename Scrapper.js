//Scrapper
async function ScrapWebsite(url) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  let res;
  //Use proxy
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

//Pops and Lolz data
let cards = ['Gaeas-Cradle','Savannah','Tropical Island','Tundra','Badlands','Power-Artifact','Lake-of-the-Dead','Survival-of-the-Fittest','Earthcraft','Lions-Eye-Diamond','Null-Rod','Time-Spiral','Squandered-Resources','Academy-Rector','Yawgmoths-Will','Rofellos-Llanowar-Emissary','Gilded-Drake','Palinchron','Intuition'];
let investor = ['Patrick','Patrick','Patrick','Patrick','Patrick','Lionel', 'Lionel','Lionel','Lionel','Lionel','Lionel','Lionel','Lionel','Lionel','Lionel','Lionel','Lionel','Lionel','Lionel'];
let amount = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
let investment = ['515.00','210.00','380.00','250.00','268.99','182.99','45.00','145.00','80.00','299.00','45.00','89.95','14.50','59.00','100.00','19.97','165.00','28.00','99.95'];
let deliveryfees = ['18.48','14.07','16.00','16.00','12.20','7.99','5.95','9.53','9.95','16.49','6.70','5.99','1.70','4.00', '14.20','11.30','13.58','5.64','15.49'];

window.onload = async function() {

  //Pops and Lolz
  //Initialize table
  document.getElementById('table').innerHTML = `<tr>
  <th>Card Name</th>
  <th>Investor</th>
  <th>Amount</th>
  <th>Investment (Euros)</th>
  <th>Delivery Fees (Euros)</th>
  <th>Current Lowest Price for one (Euros)</th>
  <th>Profit (Euros)</th>
  <th>Profit Minus Delivery Fees (Euros)</th>
  </tr>`;
  for (i=0; i<cards.length; i++) {
    var cardname = cards[i].replaceAll('-', ' ');
    var cardurl = `https://www.cardmarket.com/en/Magic/Cards/${cards[i]}?language=1&minCondition=2&isSigned=N&isPlayset=N&isAltered=N`;
    document.getElementById('table').innerHTML += `<tr>
    <td><a href = \'${cardurl}\'>${cardname}</a></td>
    <td>${investor[i]}</td>
    <td>${amount[i]}</td>
    <td>${investment[i]}</td>
    <td>${deliveryfees[i]}</td>
    <td id = \'${cards[i]}\'><em>Loading...</em></td>
    <td id = \'${cards[i]}Profit\'><em>Loading...</em></td>
    <td id = \'${cards[i]}ProfitMinus\'><em>Loading...</em></td>
    </tr>`;
  };
  //Initialize the net investment, delivery fees and lowest price for calculations
  var netInvestment = 0.;
  var netDeliveryFees = 0.;
  var netCurLowPrice = 0.;
  
  //Get current lowest price for near mint, english version, not altered, not signed and not a playset
  // from cardmarket
  for (i=0; i<cards.length; i++) {
    netInvestment += parseFloat(investment[i]);
    netDeliveryFees += parseFloat(deliveryfees[i]);
    var cardurl = `https://www.cardmarket.com/en/Magic/Cards/${cards[i]}?language=1&minCondition=2&isSigned=N&isPlayset=N&isAltered=N`;
    var curprice = await ScrapWebsite(cardurl);
    curprice = curprice.replace(',','.');
    document.getElementById(cards[i]).innerHTML = curprice;
    netCurLowPrice += parseFloat(curprice)*amount[i];
    var profit = parseFloat(curprice)*amount[i] - parseFloat(investment[i]);
    if (profit > 0) {
      document.getElementById(cards[i]+'Profit').innerHTML = profit.toFixed(2);
      document.getElementById(cards[i]+'Profit').style.color = "green"
    } else {
      document.getElementById(cards[i]+'Profit').innerHTML = profit.toFixed(2);
      document.getElementById(cards[i]+'Profit').style.color = "red"
    };
    var profitminus = profit - parseFloat(deliveryfees[i]);
    if (profitminus > 0) {
      document.getElementById(cards[i]+'ProfitMinus').innerHTML = profitminus.toFixed(2);
      document.getElementById(cards[i]+'ProfitMinus').style.color = "green"
    } else {
      document.getElementById(cards[i]+'ProfitMinus').innerHTML = profitminus.toFixed(2);
      document.getElementById(cards[i]+'ProfitMinus').style.color = "red"
    };
  };

  //Calculations
  var netProfit = netCurLowPrice - netInvestment;
  var netProfitMinDelFees = netProfit - netDeliveryFees;
  document.getElementById('netInvestment').innerHTML = netInvestment.toFixed(2);
  document.getElementById('netDelFees').innerHTML = netDeliveryFees.toFixed(2);
  document.getElementById('netCurLowPrice').innerHTML = netCurLowPrice.toFixed(2);
  if (netProfit > 0) {
    document.getElementById('netProfit').innerHTML = netProfit.toFixed(2);
    document.getElementById('netProfit').style.color = "green"
  } else {
    document.getElementById('netProfit').innerHTML = netProfit.toFixed(2);
    document.getElementById('netProfit').style.color = "red"
  };
  if (netProfitMinDelFees > 0) {
    document.getElementById('netDelFeesMin').innerHTML = netProfitMinDelFees.toFixed(2);
    document.getElementById('netDelFeesMin').style.color = "green"
  } else {
    document.getElementById('netDelFeesMin').innerHTML = netProfitMinDelFees.toFixed(2);
    document.getElementById('netDelFeesMin').style.color = "red"
  };

};

//document.querySelector("button").addEventListener("click", function(){
//  ScrapWebsite();
//}, false);