const router = require('express').Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const userService = require('../services/userService');

router.get('/info', isAuthenticated, (req, res) => {
    userService.getUserInfo(req.user._id)
        .then(userInfo => {
            console.log(userInfo);
            res.status(200);
            res.send({ userInfo })
        })
        .catch(err => {
            res.status(404);
            res.end();
        })
});

module.exports = router;