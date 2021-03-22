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

const deleteSickDayById = (sickDayId, userId) => {
   return SickDay.findOne()
    .and([{ _id: sickDayId }, { user: userId }])
    .exec()
    .then(sickDay => {
       
        if(sickDay){
            return SickDay.deleteOne({ _id: sickDayId });
        }

        return Promise.reject(new Error('Forbidden'));
    });
    
};

module.exports = {
    createSickDay,
    getAllSickDays,
    deleteSickDayById
};