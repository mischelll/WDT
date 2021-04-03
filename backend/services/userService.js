const User = require('../models/User');

const getUserInfo = (userId) => {
    return User.findById({ _id: userId }).lean();
}

module.exports = {
    getUserInfo,
}