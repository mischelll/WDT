const VacationDay = require('../models/VacationDay');
const User = require('../models/User');

const dateUtil = require('../utils/dateUtil');

const createVacationDay = (vacationDayData, userId) => {
    
    let { from, to } = vacationDayData;

    if (from > to) {
        return Promise.reject(new Error('FromDate cannot be after ToDate'));
    }

    let workingDaysCount = dateUtil.calculateNumberOfWorkingDays(from, to);

    return User.findOne({ _id: userId })
        .then(user => {
            if (user.annualVacationDaysAllowed < workingDaysCount) {
                return Promise.reject(new Error('You do not have enough vacation days!'));
            }

            return Promise.all([
                new VacationDay({ from, to, user: userId }).save()
            ]);
        })
        .catch(err => {
            throw err;
        });
};


const deleteVacationDay = (vacationDayId) => {
    return VacationDay.deleteOne({ _id: vacationDayId });
};

const updateVacationDay = (vacationDayData) => {
    let { _id, from, to } = vacationDayData;

    if (from > to) {
        return Promise.reject(new Error('FromDate cannot be after ToDate'));
    }

    return VacationDay.findOneAndUpdate({ _id: _id }, { from, to }, {
        new: true
    });

};

const getAllVacationDays = async () => {
    return await VacationDay.find({}).lean();
};

const getVacationDayByUserId = (userId) => {
    return VacationDay.find({ user: userId }).lean();
};

const getVacationDayById = (vacationDayId) => {
    return VacationDay.findOne({ _id: vacationDayId }).lean();
};

module.exports = {
    createVacationDay,
    deleteVacationDay,
    updateVacationDay,
    getAllVacationDays,
    getVacationDayByUserId,
    getVacationDayById
};