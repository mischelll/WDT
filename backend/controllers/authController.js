const { Router } = require('express');
const router = Router();

const authService = require('../services/authService');
const isGuest  = require('../middleware/isGuest');
const config = require('../config/config');

router.post('/login', isGuest, (req, res) => {
    console.log(req.url);

    authService.login(req.body)
        .then(token => {
            res.cookie(config.AUTH_COOKIE_NAME, token);
            res.status(200);
            res.send({ message: 'Successfull sign in', status: 200, time: Date.now() })
        })
        .catch(err => {
            console.log(err);
            res.status(409);
            res.end()
        });
});

router.post('/register', isGuest, (req, res) => {

    authService.register(req.body)
        .then(token => {
            res.cookie(congig.AUTH_COOKIE_NAME, token);
            res.status(200);
            res.send({ message: 'User registered successfully', status: 200, time: Date.now() })
        })
        .catch(err => {
            console.log(err);
            res.status(409);
            res.end()
        });
});

module.exports = router;