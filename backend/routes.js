const {Router} = require('express');
const authController = require('./controllers/authController');
const homeController = require('./controllers/homeController');
const router = Router();

router.use('/', homeController);
router.use('/auth', authController);

router.get('*', (req, res) => {
    res.json({message: 'error page'});
});

module.exports = router;