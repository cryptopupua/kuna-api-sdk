const keys = {
    publicKey: 'u8vHSYIZy9Dst0qu3J1xrttxoHibCS5miLXrXOoS',
    secretKey: 'b0nsAEq6urPpkpGxzwl7dwvJR4dhwf2VpP4mTIyi',
  };

  const oldkuna = require('./v2')(keys);
  const kuna = require('./v3')(keys); 


  oldkuna.private.getInfoUser()
  .then((data) => console.log(data))
  .catch(err => console.log('Error: ', err));


  kuna.private.accountInfo()
  .then((data) => console.log(data))
  .catch(err => console.log('Error: ', err));

  kuna.private.accountBalance()
  .then((data) => console.log(data))
  .catch(err => console.log('Error: ', err));