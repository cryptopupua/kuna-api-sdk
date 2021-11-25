/* jshint esversion: 9 */
const { Router } = require('express');
const { check, body, validationResult } = require('express-validator');
const router = Router();
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
            res.status(200).json({ balance });
        } catch (e) {
            res.status(500).json({ message: `Error catched: ${e.message}`});
        }
      }
);

///api/kuna/kunacode
router.get(
    '/kunacode',
    [
      check('code','Minimal kunacode lenght 5').isLength({min: 5})
    ],
    async (req,res) => {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()){
        return res.status(400).json({
          errors: errors.array(),
          message: 'incorrect kunacode data '
        });
      }

      const inkunacode = req.query.code;
      if (inkunacode.length !== 5)  {
        kuna.public.validateKunaCode(inkunacode);
      }
      var kunacodepattern1=inkunacode.slice(0, 5);
      const result = await kuna.public.checkKunaCode(kunacodepattern1);
      res.status(200).json({ kunacodeinfo: result});
    } catch (e) {
      res.status(500).json({ message: `Error catched: ${e.message}`});
    }
  }
);

///api/kuna/kunacodeactivate
router.post(
  '/kunacodeactivate',    
  check('code','Minimal kunacode lenght 5').isLength({min: 5}),
  async (req,res) => {
    try {
      console.log(`Body${req.body}`);
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect activation data"
        }
        );
      }
    
      const {code} = req.body ;
      kuna.public.validateKunaCode(code);
      var kunacodepattern1=code.slice(0, 5);
      const result = await kuna.public.checkKunaCode(kunacodepattern1);
      let kunacodeinfo = result;
      if (kunacodeinfo.redeemed_at === null) {
        const result = await kuna.private.activateCode(code);
      }

      res.status(201).json( {message: result } );
    } catch (e) {
      res.status(500).json( {message: `Error catched: ${e.message}`} );
    }
  }
);

module.exports = router;