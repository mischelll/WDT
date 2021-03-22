const calculateNumberOfWorkingDays = (from, to) => {
    from = new Date(from);
    to = new Date(to);
    let timeFiff = to.getTime() - from.getTime();

    let daysCount = timeFiff / (1000 * 3600 * 24) + 1;
    let weekendDaysCount = 0;

    for (let i = 0; i < daysCount; i++) {
        if (from.getDay() === 6 || from.getDay() === 0) {
            weekendDaysCount += 1;
        }

        from.setDate(from.getDate() + 1)
    }

    return daysCount - weekendDaysCount;
};

module.exports = {
    calculateNumberOfWorkingDays
}