const calculateNumberOfDays = (from, to) => {
    from = new Date(from);
    to = new Date(to);
    let timeFiff = to.getTime() - from.getTime();
    let daysCount = timeFiff / (1000 * 3600 * 24);

    return daysCount + 1;
};

module.exports = {
    calculateNumberOfDays
}