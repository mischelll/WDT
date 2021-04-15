const SickDay = require('../models/SickDay');
const User = require('../models/User');

const dateUtil = require('../utils/dateUtil');

const createSickDay = (sickDayData, userId) => {

    let { from, to, reason } = sickDayData;

    if (from > to) {
        return Promise.reject(new Error('From Date cannot be after To Date'));
    }

    let workingDaysCount = dateUtil.calculateNumberOfWorkingDays(from, to);

    return User.findOne({ _id: userId })
        .then(user => {
            if (user.annualSickDaysAllowed < workingDaysCount) {
                return Promise.reject(new Error('You do not have enough sick days!'));
            }

            return Promise.all([
                User.findOneAndUpdate({ _id: userId }, { $inc: { 'annualSickDaysAllowed': -workingDaysCount } }).exec(),
                new SickDay({ from, to, reason, user: userId }).save()
            ]);
        })
        .catch(err => {
            throw err;
        });
};

const getAllSickDays = async () => {
    return await SickDay.find({}).lean();
};

const getSickDaysByUserId = (userId) => {
    return SickDay.find({ user: userId }).lean();
}

const updateSickDay = (sickDayData) => {
    let { _id, from, to, reason } = sickDayData;

    if (from > to) {
        return Promise.reject(new Error('From Date cannot be after To Date'));
    }

    return SickDay.findOneAndUpdate({ _id: _id }, { from, to, reason }, {
        new: true
    });
};

const deleteSickDayById = (sickDayId, userId) => {
    return SickDay.findOne()
        .and([{ _id: sickDayId }, { user: userId }])
        .exec()
        .then(sickDay => {

            if (sickDay) {
                return SickDay.deleteOne({ _id: sickDayId });
            }

            return Promise.reject(new Error('Forbidden'));
        });

};

module.exports = {
    createSickDay,
    getAllSickDays,
    deleteSickDayById,
    updateSickDay,
    getSickDaysByUserId
};