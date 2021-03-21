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


const updateVacationDay = (vacationDayId, vacationDayData) => {
    let {_id, from, to } = vacationDayData;

    if (from > to) {
        return Promise.reject(new Error('FromDate cannot be after ToDate'));
    }

    return VacationDay.findOneAndUpdate({ _id: _id }, { from, to }, {
        new: true
    });

};

const getAllVacationDAys = () => {

};

module.exports = {
    createVacationDay,
    deleteVacationDay,
    updateVacationDay,
    getAllVacationDAys
}