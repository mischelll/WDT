const roleService = require('../services/roleService');

module.exports = async (req, res, next) => {
    if (req.user) {
       let role = await roleService.getRoleById(res.locals.user.roles[0])
        console.log(role.name);
        return res.send({error: 'Already authenticated!'});
    }

    next();
}