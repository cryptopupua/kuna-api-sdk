const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const router = Router()

///api/account/getbalance
router.get(
    '/getbalance', [
        check('email', 'Incorrect email').isEmail(),
        check('passsword', 'Minimal password lenght 6')
        .isLength( min=6 )
    ],
    async(req, res) => {
        try {
            res.status(201).json({ message: 'Balance here ...' })

        } catch (e) {
            res.status(500).json({ message: 'Something wrong, try later ...' })
        }
    })

module.exports = router