const router = require('express').Router();
const vacationDayService = require('../services/vacationDayService');
const userService = require('../services/userService');
const isAuthenticated = require('../middleware/isAuthenticated');
const { Logform } = require('winston');

router.get('/', isAuthenticated, async (req, res) => {
    let mappedDays = [];
    let vacationDays = await vacationDayService.getAllVacationDays();
    
    let newArr = vacationDays.map(async (day) => {
        let user = await userService.getUserUsernameById(day.user);
        day.username = user.username;
        return Object.assign(day, { ...day, username: user.username });
    })

    Promise.all(newArr)
        .then(mappedVacationDays => {
            res.status(200);
            res.send(mappedVacationDays)
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
    vacationDayService.getVacationDayByUserId(req.params['userId'])
        .then(days => {
            res.status(200);
            res.send(days)
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

router.get('/:vacaDayId', isAuthenticated, (req, res) => {
    vacationDayService.getVacationDayById(req.params['vacaDayId'])
        .then(days => {
            res.status(200);
            res.send(days)
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

router.post('/', isAuthenticated, (req, res) => {
    const userId = req.user._id;
    const body = req.body;

    vacationDayService.createVacationDay(body, userId)
        .then(day => {
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

    vacationDayService.updateVacationDay(body)
        .then(day => {
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

router.delete('/:vacaDay_id', isAuthenticated, (req, res) => {
    const id = req.params['vacaDay_id'];

    vacationDayService.deleteVacationDay(id)
        .then(day => {
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
