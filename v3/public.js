/**
*   API KUNA - V3 - public
*
*/

const axios = require('axios-https-proxy-fix')

function KunaPublic () {
  this.api  = 'https://api.kuna.io/v3/'
} 

/**
 * Забрать время Юникс
 * @description https://api.kuna.io/v3/timestamp
 */
KunaPublic.prototype.getUnixTime = function(){
  return this.request('timestamp').then((data) => data.timestamp_miliseconds)
}

/**
 * Список доступных валют
 * @description https://api.kuna.io/v3/currencies
 */
KunaPublic.prototype.getCurrencies = function() {
  return this.request(`currencies`)
}

/**
 * Рынки
 * @description https://api.kuna.io/v3/markets
 */
KunaPublic.prototype.getMarkets = function() {
  return this.request(`markets`)
}

/**
 * Последние данные по рынку
 * @description https://api.kuna.io/v3/tickers?symbols=btcuah
 */
KunaPublic.prototype.getTickers = function(market) {
  if (!market) {
    return Promise.reject('Set a pair of crypto (btcuah, ethuah)')
  }
  return this.request(`tickers?symbols=${market}`)
}

/**
 * Биржевой стакан
 * @description https://api.kuna.io/v3/book/{symbol}
 */
KunaPublic.prototype.getOrderBook = function(market) {
  if (!market) {
    return Promise.reject('Set a pair of crypto (btcuah, ethuah)')
  }
  return this.request('book/' + market)
}


/**
 * Комиссии на ввод и вывод
 * @description https://api.kuna.io/v3/fees
 */
KunaPublic.prototype.getFees = function() {
  return this.request('fees')
}

/**
 * Validate kuna code
 * @param {*} code 
 * @returns 
 */
KunaPublic.prototype.validateKunaCode = function(kunaCode) {
  const base58Alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';

  if(!kunaCode || kunaCode.length < 1) {
      throw new Error('Missing Kuna Code');
  }

  const segments = kunaCode.split('-');
  const sufix = segments.slice(-2);
  const body = segments.slice(0, -2);
  if (sufix[1] !== 'KCode' || body.length !== 9) {
      throw new Error('Invalid format');
  }

  // Check KunaCode checksum
/*   const checksum = base58Alphabet.indexOf(body[0][0]);

  const str = body.join('').slice(1);
  let i = str.length;
  let sum = 0;
  while (i--) {
      sum += base58Alphabet.indexOf(str.charAt(i));
  }

  if (sum % 58 !== checksum) {
      throw new Error('Invalid checksum');
  } */
}


/**
 * Check kuna-code
 * @code {*} First 5 symbols from kuna code 
 */
KunaPublic.prototype.checkKunaCode = function(code) {
  return this.request('kuna_codes/'+code+'/check')
}


/**
 * Сделать запрос
 * @param {String} url_api
 * @param {String} method
 * @param {Object} postData
 */
KunaPublic.prototype.request = function(url_api, method, postData) {
  url      = this.api + url_api
  method   = method   || 'get'
  postData = postData || {}

  return axios[method](url, {})
    .then(({data}) => data )
     .catch((error) => {
       if (error.response != undefined) {
         console.log('ERROR')
         console.log(error.message)

       } else {
         console.log('ERROR 2')
         console.log(error)
       }
     })
}




module.exports = KunaPublic


