function checkCode(inkunacode) {

  const keys = {
    publicKey: 'u8vHSYIZy9Dst0qu3J1xrttxoHibCS5miLXrXOoS',
    secretKey: 'b0nsAEq6urPpkpGxzwl7dwvJR4dhwf2VpP4mTIyi',
  };

  const kuna = require('./v3')(keys); 

  try {
    kuna.public.validateKunaCode(inkunacode)
    var kunacodepattern1=inkunacode.slice(0, 5);
    return 'Kuna code - valid!';
  } catch (error) {
    return error.message;
  } 

/*   return  kuna.public.checkKunaCode(kunacodepattern1)
  .then((data) => data)
  .catch((err) => err);    */
}

const prompt = require('prompt-sync')();


if (process.argv.length < 3)
{
  const kunacode = prompt('Get me kuna code:');
  console.log(checkCode(kunacode));
} else {
  console.log(checkCode(process.argv.slice(2)[0])); 
}

 

  
/*   kuna.private.activateCode('wfD2V-GCnnw-R9V9L-TyphL-JPd3q-zRUpi-Rtd1N-H4SMr-cXjMx-UAH-KCode')
  .then((data) => console.log(data))
  .catch(err => console.log('Error: ', err));  */