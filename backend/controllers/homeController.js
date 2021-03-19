const {Router} = require('express');
const router = Router();

router.get('/home', (req, res) => {
    res.json({ message: 'hello' });
    res.end()
});


module.exports = router;