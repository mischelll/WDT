const VacationDay = require('../models/VacationDay');

const createVacationDay = (vacationDayData, userId) => {
    let { from, to } = vacationDayData;

    if (from > to) {
        return Promise.reject(new Error('FromDate cannot be after ToDate'));
    }

    return new VacationDay({ from, to, user: userId }).save();
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

const getAllVacationDays = () => {
    return VacationDay.find({}).lean();
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
}