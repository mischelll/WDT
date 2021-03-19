const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 9;

const userSchema = new Schema({
    id: monogoose.Types.ObjectId,

    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username must be unique'],
        minLength: [4, 'Username must be at least 4 characters'],
        validate: {
            validator: (v) => {
                return /^[a-zA-z]+[0-9]*$/.test(v);
            },
            message: () => `Username must contain only english letters and digits!`
        }
    },

    email: {
        type: String,
        required: [true, 'Email cannot be empty!'],
        unique: [true, 'Email must be unique'],
        validate: {
            validator: (v) => {
                return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(v);
            },
            message: () => 'Not a valid email.'
        }
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [4, 'Password must be at least 4 characters'],
        validate: {
            validator: (v) => {
                return /^[a-zA-z]+[0-9]*$/.test(v);
            },
            message: () => `Password must contain only english letters and digits!`
        }
    },

    roles: [{
        type: mongoose.Types.ObjectId,
        ref: 'Role'
    }],

    sickDays: [{
        type: mongoose.Types.ObjectId,
        ref: 'SickDay'
    }],

    vacationDays: [{
        type: mongoose.Types.ObjectId,
        ref: 'VacationDay'
    }],

    annualVacationDaysAllowed: {
        type: Number,
        required: [true, 'Annual Vacation days allowed cannot be empty!']
    }
})

userSchema.pre('save', function (next) {
    bcrypt.genSalt(SALT_ROUNDS)
        .then(salt => {
            return bcrypt.hash(this.password, salt);
        })
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => {
            throw Error(err.message)
        });
});

module.exports = Model('User', userSchema);