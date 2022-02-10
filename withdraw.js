const keys = require('./keys');
const kuna = require('./v3')(keys); 
const prompt = require('prompt-sync')();

function withdrawal(cardnumber, howmuch) {
  try {
    request = { withdraw_type : 'uah', amount : howmuch, withdrawall : true, address : cardnumber };
    kuna.private.withdrawal(request).then((data)=> console.log(data));
  } catch (error) {
    return error.message;
  } 
}


if (process.argv.length < 4)
{
  const cardnumber = prompt('Get me card number:');
  const howmuch = prompt('How much UAH you want?');
  console.log(withdrawal(cardnumber, howmuch));
} else {
  console.log(withdrawal(process.argv.slice(2)[0],process.argv.slice(3)[0])); 
}
