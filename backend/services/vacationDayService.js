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
                new VacationDay({ from, to, user: userId, missedWorkingDays: workingDaysCount, revenue: user.paymentPerDay * workingDaysCount }).save()
            ]);
        })
        .catch(err => {
            throw err;
        });
};


const deleteVacationDay = (vacationDayId, userId) => {
   return VacationDay.findById({ _id: vacationDayId })
        .then(day => {
            return Promise.all(
                [
                    User.findOneAndUpdate({ _id: userId },
                        { $inc: { 'annualVacationDaysAllowed': day.missedWorkingDays } }, {
                        new: true
                    })
                        .exec(),

                    VacationDay.deleteOne({ _id: vacationDayId })
                ])
        })

};

const updateVacationDay = (vacationDayData, userId) => {
    let { _id, from, to } = vacationDayData;

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
                VacationDay.findOneAndUpdate({ _id: _id }, { from, to }, {
                    new: true
                })
            ]);
        })
        .catch(err => {
            throw err;
        });
};



const getAllVacationDays = async () => {
    return await VacationDay.find({}).sort({ from: 'descending', to: 'descending' }).lean();
};

const getVacationDayByUserId = (userId) => {
    return VacationDay.find({ user: userId }).sort({ from: 'descending', to: 'descending' }).lean();
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