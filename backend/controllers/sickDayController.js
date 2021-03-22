const router = require('express').Router();

const sickDayService = require('../services/sickDayService');
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/', isAuthenticated, (req, res) => {
    sickDayService.getAllSickDays()
        .then(sickDays => {
            res.status(200);
            res.send(sickDays)
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

router.post('/', isAuthenticated, (req, res) => {
    sickDayService.createSickDay(req.body, req.user._id)
        .then(sickDay => {
            res.status(201);
            res.send(sickDay)
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

router.delete('/:sickDayId', isAuthenticated, (req, res) => {
    sickDayService.deleteSickDayById(req.params['sickDayId'], req.user._id)
        .then(sickDay => {
            res.status(200);
            res.send(sickDay)
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
    sickDayService.updateSickDay(req.body)
        .then(sickDay => {
            res.status(200);
            res.send(sickDay)
        })
        .catch(err => {
            res.status(409);
            res.send({
                error: err.message,
                code: 409,
                time: new Date().toISOString()
            });
        });
})

module.exports = router;