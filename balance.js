  const keys = require('./keys');
  const kuna = require('./v3')(keys); 

  kuna.private.accountBalance()
  .then((data) => console.log(data))
  .catch(err => console.log('Error: ', err));