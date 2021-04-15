const router = require('express').Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const roleService = require('../services/roleService');

router.get('/:roleId', isAuthenticated, (req, res) => {
    roleService.getRoleById(req.params['roleId'])
        .then(roleName => {
            res.status(200);
            res.send({ name: roleName.name })
        })
        .catch(err => {
            res.status(404);
            res.send({
                error: err.message,
                code: 404,
                time: new Date().toISOString()
            });
        });
});

module.exports = router;