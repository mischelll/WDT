const Role = require('../models/Role');

const saveRole = (roleData) => {
    let roleName = roleData.name;

    return new Role({ name: roleName }).save();
};

const getRoleByName = (name) => {
    return Role.findOne({ name: name }).lean();
};

const getRoleById = async (id) => {
    return await Role.findById(id).lean();
};

module.exports = {
    saveRole,
    getRoleByName,
    getRoleById
}