const router = require('express').Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const userService = require('../services/userService');
const roleService = require('../services/roleService');

router.get('/info', isAuthenticated, (req, res) => {
    userService.getUserInfo(req.user._id)
        .then(userInfo => {
            roleService.getRoleById(userInfo.roles[0])
                .then(role => {
                    console.log(role);
                    userInfo.roleName = role.name;
                    res.status(200);
                    res.send({ userInfo })
                })
        })
        .catch(err => {
            res.status(404);
            res.end();
        })
});

module.exports = router;