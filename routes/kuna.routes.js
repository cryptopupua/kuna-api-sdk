const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const router = Router()
const keys = require('../keys');
const kuna = require('../v3')(keys); 

///api/kuna/getbalance
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
                    balance.push( { code: currentCurrency[1],  amount: currentAmount} );
                  }
                });
              } 
            res.status(201).json({ balance })

        } catch (e) {
            res.status(500).json({ message: `Error:` + e.message })
        }
    })

///api/kuna/kunacode
router.get(
  '/kunacode',
  [
    check('code','Minimal kunacode lenght 5')
    .isLength(min = 5)
  ],
  async (req,res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()){
        return res.status(400).json({
          errors: errors.array(),
          message: 'incorrect kunacode data '
        })
      }

      const code = req.query['code']
      const result = code;

     res.status(201).json({message:`Info about code:${result}`})
    } catch (e) {
      res.status(500).json({ message: `Error when getting kunacode info${e.message}`})
    } 
  }
)

module.exports = router