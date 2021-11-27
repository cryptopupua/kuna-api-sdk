const config = require('config');

const keys = {
    publicKey: config.get('publicKey'),
    secretKey: config.get('secretKey')
  };

module.exports = keys;
