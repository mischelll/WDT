const router = require('express').Router();

const isGuest = require('../middleware/isGuest');
const isAdmin = require('../middleware/isAdmin');
const isAuthenticated = require('../middleware/isAuthenticated');

const adminService = require('../services/adminService');

router.put('/vacationDay/:id', isAuthenticated, isAdmin, (req, res) => {
    adminService.changeStatusOfVacationDay(req.body.status, req.params['id'])
        .then(day => {
            res.status(200);
            res.send({ message: 'Successfull status update of vacation day', status: 200, time: new Date().toISOString(), body: day[1] })
            console.log(day);
        })
        .catch(err => console.log(err.message));
});

router.put('/sickDay/:id', isAdmin, (req, res) => {

});

module.exports = router;