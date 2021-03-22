const { Router } = require('express');
const router = Router();

const authController = require('./controllers/authController');
const homeController = require('./controllers/homeController');
const vacationDayController = require('./controllers/vacationDayController');
const sickDayController = require('./controllers/sickDayController');

router.use('/api', homeController);
router.use('/api/auth', authController);
router.use('/api/vacationDay', vacationDayController);
router.use('/api/sickDay', sickDayController);

router.get('*', (req, res) => {
    res.json({ message: 'error page' });
});

module.exports = router;