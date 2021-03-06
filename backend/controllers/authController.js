const { Router } = require('express');
const router = Router();

const authService = require('../services/authService');
const config = require('../config/config');

const isGuest = require('../middleware/isGuest');
const isAdmin = require('../middleware/isAdmin');
const isAuthenticated = require('../middleware/isAuthenticated');

router.post('/login', isGuest, (req, res) => {

    authService.login(req.body)
        .then(token => {
            res.setHeader(config.AUTH_HEADER_NAME, 'Bearer ' + token)
            res.status(200);
            res.send({ "id_token": token })
        })
        .catch(err => {
            console.log(err);
            res.status(401);
            res.send(err[0]);
        });
});

router.post('/register', isGuest, (req, res) => {

    authService.register(req.body)
        .then(token => {
            res.status(201);
            res.send({ successfullMessage: "Successfull registration", code: 200 })
        })
        .catch(err => {
            console.log(err);
            res.status(409);
            res.send(err);
        });
});

router.post('/logout', (req, res) => {
    res.removeHeader(config.AUTH_HEADER_NAME);
    res.status(200);
    res.send({ message: 'Logout successfull', status: 200, time: new Date().toISOString() })
});

router.get('/admin', isAuthenticated, isAdmin, (req, res) => {
    res.send('Hello admin!');
});

module.exports = router;