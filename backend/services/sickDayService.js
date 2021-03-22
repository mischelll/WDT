const SickDay = require('../models/SickDay');

const createSickDay = (sickDayData, userId) => {
    let { from, to, reason } = sickDayData;

    if (from > to) {
        return Promise.reject(new Error('FromDate cannot be after ToDate'));
    }

    return new SickDay({ from, to, reason, user: userId }).save();
};

const getAllSickDays = () => {
    return SickDay.find({}).lean();
};

module.exports = {
    createSickDay,
    getAllSickDays
};