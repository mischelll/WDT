const jwt = require('jsonwebtoken');
const config = require('../config/config');


module.exports = function () {
    return (req, res, next) => {
        let token = req.cookies[config.AUTH_COOKIE_NAME];
        if (token) {
            jwt.verify(token, config.SECRET,  function (err, decoded) {
                if (err) {
                    res.clearCookie(config.AUTH_COOKIE_NAME);
                } else {
                    req.user = decoded;

                    res.locals.user = decoded;
                    res.locals.username = decoded.username;
                    res.locals.isAuthenticated = true;
                }
            });
        }

        next();
    };
}