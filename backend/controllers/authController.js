const {Router} = require('express');
const router = Router();

router.get('/login', (req, res) => {
     console.log(req.url);
    res.json({ message: 'hello' });
    
});


module.exports = router;