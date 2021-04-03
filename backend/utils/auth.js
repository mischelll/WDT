const jwt = require('jsonwebtoken');
const config = require('../config/config');


module.exports = function () {
    return (req, res, next) => {
        const bearerToken = req.headers.authorization;
        if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
            const jwtToken = bearerToken.slice(7, bearerToken.length);
            jwt.verify(jwtToken, config.SECRET, function (err, decoded) {
                try {
                    if (err) {
                        res.status(403);
                        throw Error(err.message)
                    } else {
                        req.user = decoded;
                        res.locals.user = decoded;
                        res.locals.username = decoded.username;
                        res.locals.isAuthenticated = true;

                    }
                } catch (err) {
                    console.warn(err.message)
                }
            });
        }

        next();
    };
}