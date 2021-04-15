const { Router } = require('express');
const router = Router();

const authController = require('./controllers/authController');
const homeController = require('./controllers/homeController');
const vacationDayController = require('./controllers/vacationDayController');
const sickDayController = require('./controllers/sickDayController');
const adminController = require('./controllers/adminController');
const userController = require('./controllers/userController');
const roleController = require('./controllers/roleController');

router.use('/api', homeController);
router.use('/api/auth', authController);
router.use('/api/vacationDay', vacationDayController);
router.use('/api/sickDay', sickDayController);
router.use('/api/admin', adminController);
router.use('/api/user', userController);
router.use('/api/role', roleController);

router.get('*', (req, res) => {
    res.json({ message: 'error page' });
});

module.exports = router;