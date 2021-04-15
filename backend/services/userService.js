const User = require('../models/User');

const getUserInfo = (userId) => {
    return User.findById({ _id: userId }).lean();
}

const getUserUsernameById = async (userId) => {
    return await User.findById({_id: userId}).select('username').exec();
}
module.exports = {
    getUserInfo,
    getUserUsernameById
}