const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const sickDaySchema = new Schema({
    id: mongoose.Types.ObjectId,

    from: {
        type: Date,
        required: [true, 'Sick day: from cannot be empty!'],

    },

    to: {
        type: Date,
        required: [true, 'Sick day: to cannot be empty!'],
    },

    reason: {
        type: String,
        required: [true, 'Sick day: Reason must be provided!'],
        minLength: [5, 'Reason must be at least 5 characters long.']
    },

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = Model('SickDay', sickDaySchema);