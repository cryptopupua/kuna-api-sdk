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

///api/kuna/createkunacode
router.post(
  '/createkunacode',    
  [ ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect data for KunaCode creation"
        }
        )
      };
     
      kunacodeinfo = {recipient: '', amount: req.body.amount, currency: req.body.currency, non_refundable_before: null, comment: null, private_comment: null};
      const result = await kuna.private.createKunacode(kunacodeinfo);

      res.status(201).json({kunacodeinfo: result});
    } catch (e) {
      res.status(500).json( {message: `Error catched: ${e.message}`} )
    }    
  }  
)

///api/kuna/kunacodeactivate
router.post(
  '/kunacodeactivate',    
  [
    check('code','Minimal kunacode lenght 5')
    .isLength(min = 5)
  ],
  async (req,res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect activation data"
        }
        );
      }
    
      const {code} = req.body;
      kuna.public.validateKunaCode(code);
      var kunacodepattern1=code.slice(0, 5);
      var result = await kuna.public.checkKunaCode(kunacodepattern1);
      if (result.redeemed_at === null) {
        result = await kuna.private.activateKunaCode(code);
      };
      res.status(201).json({ kunacodeinfo: result } );
    } catch (e) {
      res.status(500).json( {message: `Error catched: ${e.message}`} );
    }
  }
);

module.exports = router;