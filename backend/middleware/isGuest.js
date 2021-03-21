module.exports = async (req, res, next) => {

    if (req.user) {
        res.status(409);
        return res.send({error: 'Already authenticated!', code: 409, time: new Date().toISOString()});
    }

    next();
}