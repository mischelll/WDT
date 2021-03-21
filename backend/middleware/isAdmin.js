const roleService = require('../services/roleService');

module.exports = async (req, res, next) => {
    let role = await roleService.getRoleById(res.locals.user.roles[0])

    if (req.user && role.name !== 'ROLE_ADMIN') {
        res.status(403);
        return res.send({ error: 'Unauthorized access!', code: 403, time: new Date().toISOString() });
    }

    next();
}