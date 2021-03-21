const vacationDayService = require('../services/vacationDayService');
const router = require('express').Router();

const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/', isAuthenticated, (req, res) => {
    res.send('All vacay days');
});

router.post('/', isAuthenticated, (req, res) => {
    const userId = req.user._id;
    const body = req.body;

    vacationDayService.createVacationDay(body, userId)
        .then(day => {
            console.log(day);
            res.status(201);
            res.send({ message: 'Successfull creation of vacation day', status: 200, time: new Date().toISOString() })
        })
        .catch(err => {
            res.status(409);
            res.send({
                error: err.message,
                code: 409,
                time: new Date().toISOString()
            });
        });
});

router.put('/', isAuthenticated, (req, res) => {
    // 60575ff13c44a92bc8b0e4dd
    const body = req.body;

    vacationDayService.updateVacationDay('60575ff13c44a92bc8b0e4dd', body)
        .then(day => {
            console.log(day);
            res.status(200);
            res.send(day);
        })
        .catch(err => {
            res.status(409);
            res.send({
                error: err.message,
                code: 409,
                time: new Date().toISOString()
            });
        })
});

module.exports = router;
