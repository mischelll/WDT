module.exports = (req, res, next) => {
    if (!req.user) {
        res.status(403);
        return res.send({error: 'Unauthorized!', code: 403, time: new Date().toISOString()});
    }

    next();
};