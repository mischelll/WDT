const { Router } = require('express');
const router = Router();

const authService = require('../services/authService');

router.get('/login', (req, res) => {
    console.log(req.url);
    res.json({ message: 'hello' });

});

router.post('/register', (req, res) => {
    
    authService.register(req.body)
        .then(token => {
            res.setHeader('Bearer', token);
            res.status(200);
            res.send({ message: 'User registered successfully', status: 200, time: Date.now() })
        })
        .catch(err =>{
            console.log(err);
            res.status(409);
            res.end()
        } )
});


module.exports = router;