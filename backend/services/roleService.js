const Role = require('../models/Role');

const saveRole = (roleData) => {
    let roleName = roleData.name;

    return new Role({name: roleName}).save();
}

const getRoleByName =  (name) => {
    return  Role.findOne({name: name}).lean();
    
}

module.exports = {
    saveRole,
    getRoleByName
}