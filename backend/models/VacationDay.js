const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

const vacationDaySchema = new Schema({
    id: monogoose.Types.ObjectId,

    from:{
        type: Date,
        required: [true, 'Vacation day: from cannot be empty!'],

    },

    to: {
        type: Date,
        required: [true, 'Vacation day: to cannot be empty!'],
    },
    
    status: {
        type: String,
        enum: ['approved','pending','declined'],
        default: 'pending'
    }
});

modules.exports = Model('VacationDay', vacationDaySchema);