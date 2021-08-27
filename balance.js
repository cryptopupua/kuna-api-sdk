  function printBalance(balance){
    if (balance instanceof Array) {
      balance.forEach(function(currentCurrency){
        let currentAmount = currentCurrency[currentCurrency.length-1];
        if (currentAmount > 0) {
          console.log(`Currency code:${currentCurrency[1]} ammount:${currentAmount}`)
        }
      })
      //console.log(balance)
    } 
  } 


  const keys = require('./keys');
  const kuna = require('./v3')(keys); 


  kuna.private.accountBalance()
  .then((data) =>printBalance(data))
  .catch(err => console.log('Error: ', err));