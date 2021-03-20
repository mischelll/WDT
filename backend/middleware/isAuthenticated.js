module.exports = (req, res, next) => {
    if (!req.user) {
        return res.send({error: 'Unauthorized!', code: 403});
    }

    next();
};