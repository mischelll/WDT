const router = require('express').Router();
const sickDayService = require('../services/sickDayService');
const isAuthenticated = require('../middleware/isAuthenticated');
const userService = require('../services/userService');

router.get('/', isAuthenticated, async (req, res) => {
    let sickDays = await sickDayService.getAllSickDays();

    let newArr = sickDays.map(async (day) => {
        let user = await userService.getUserUsernameById(day.user);
        day.username = user.username;
        return Object.assign(day, { ...day, username: user.username });
    })

    Promise.all(newArr)
        .then(mappedSickDays => {
            res.status(200);
            res.send(mappedSickDays)
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

router.get('/user/:userId', isAuthenticated, (req, res) => {
    sickDayService.getSickDaysByUserId(req.params['userId'])
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

router.post('/', isAuthenticated, (req, res) => {
    sickDayService.createSickDay(req.body, req.user._id)
        .then(sickDay => {
            console.log(sickDay);
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
});

module.exports = router;