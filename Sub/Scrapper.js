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
      var st = result.search("From</dt>")+38;
      var end = result.search("€</dd>")-1;
      res = result.substring(st,end);
    })
    .catch(error => {res = 'error'});
  return res;
};

//Pops and Lolz data
let cards = ['Azusa, Lost but Seeking'];
let investor = ['Lionel'];
let cardurl = ['https://www.cardmarket.com/en/Magic/Products/Singles/Masters-25/Azusa-Lost-but-Seeking?language=1&minCondition=2&isSigned=N&isPlayset=N&isAltered=N']
let amount = [4]
let investment = ['16.95'];
let deliveryfees = ['1.70'];

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
    document.getElementById('table').innerHTML += `<tr>
    <td><a href = \'${cardurl[i]}\'>${cardname}</a></td>
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
    var curprice = await ScrapWebsite(cardurl[i]);
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