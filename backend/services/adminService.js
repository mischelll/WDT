const SickDay = require('../models/SickDay');
const VacationDay = require('../models/VacationDay');
const User = require('../models/User');

const dateUtil = require('../utils/dateUtil');

const changeStatusOfVacationDay = (status, id) => {
    if (status === 'approved') {
        return VacationDay.findOne({ _id: id })
            .then(vacationDay => {
                let workingDaysCount = dateUtil.calculateNumberOfWorkingDays(vacationDay.from, vacationDay.to);
                console.log(vacationDay);
                return Promise.all(
                    [
                        User.findOneAndUpdate({ _id: vacationDay.user },
                            { $inc: { 'annualVacationDaysAllowed': -workingDaysCount } }, {
                            new: true
                        })
                            .exec(),
                        VacationDay.findOneAndUpdate({ _id: id }, { status: status }, {
                            new: true
                        })
                            .exec()
                    ])
            })
            .catch(err => console.log('wut ' + err.message));
    } else if (status === 'declined') {
        return VacationDay.findOneAndUpdate({ _id: id }, { status: status }, {
            new: true
        })
            .exec();
    }
}

const changeStatusOfSickDay = (status, id) => {

}


module.exports = {
    changeStatusOfVacationDay,
}