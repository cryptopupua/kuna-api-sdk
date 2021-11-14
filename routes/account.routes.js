const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const router = Router()
const keys = require('../keys');
const kuna = require('../v3')(keys); 

///api/account/getbalance
router.get(
    '/getbalance',
    async(req, res) => {
        try {
            let rawbalance  = await kuna.private.accountBalance();
            let balance = [];
            if (rawbalance instanceof Array) {
                rawbalance.forEach(function(currentCurrency){
                  let currentAmount = currentCurrency[currentCurrency.length-1];
                  if (currentAmount > 0) {
                    balance.push(`Currency code:${currentCurrency[1]} ammount:${currentAmount}`);
                  }
                });
              } 
            res.status(201).json({ balance })

        } catch (e) {
            res.status(500).json({ message: `Error:` + e.message })
        }
    })

module.exports = router