function checkCode(inkunacode) {
  try {
    kuna.public.validateKunaCode(inkunacode)
    var kunacodepattern1=inkunacode.slice(0, 5);
    kuna.public.checkKunaCode(kunacodepattern1)
      .then((data) =>  step2(data, inkunacode))
      .catch(err => console.log('Error: ', err));
  } catch (error) {
    return error.message;
  } 
}

function step2(data,inkunacode) {
  console.log(data);
  if (data.status === 'active') {
    const isactivate = prompt('Activate code? (y/N)');
    if (isactivate === 'y') {
      try {
        kuna.private.activateCode(inkunacode).then((data)=> console.log(data));
      } catch (error) {
          return error.message;
      }
    }   
  }
}


const keys = {
    publicKey: 'u8vHSYIZy9Dst0qu3J1xrttxoHibCS5miLXrXOoS',
    secretKey: 'b0nsAEq6urPpkpGxzwl7dwvJR4dhwf2VpP4mTIyi',
  };

const kuna = require('./v3')(keys); 
const prompt = require('prompt-sync')();

if (process.argv.length < 3)
{
  const kunacode = prompt('Get me kuna code:');
  console.log(checkCode(kunacode));
} else {
  console.log(checkCode(process.argv.slice(2)[0])); 
}
