const { Router } = require('express');
const router = Router();
const roleService = require('../services/roleService');


router.get('/home', (req, res) => {

    res.json(
        {
            message: 'hello',
            body: 'user',
        }
    );

});

router.post('/role', (req, res) => {
    console.log(req.body);
    roleService.saveRole(req.body)
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));

        res.send('created successfully')
})

module.exports = router;