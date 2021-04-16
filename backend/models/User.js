const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 9;

const userSchema = new Schema({
    id: mongoose.Types.ObjectId,

    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username must be unique'],
        minLength: [4, 'Username must be at least 4 characters'],
        validate: {
            validator: (v) => {
                return /^[a-zA-z0-9]+$/.test(v);
            },
            message: () => `Username must contain only english letters and digits (including '_')!`
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

    paymentPerDay: {
        type:Number,
        default: 31.36
    },
    
    roles: [{
        type: mongoose.Types.ObjectId,
        ref: 'Role'
    }],

    sickDays: [{
        type: mongoose.Types.ObjectId,
        ref: 'SickDay',

    }],

    vacationDays: [{
        type: mongoose.Types.ObjectId,
        ref: 'VacationDay',
        min: [1, 'Cannot have less than 1 vacation day per year.'],
    }],

    annualVacationDaysAllowed: {
        type: Number,
        required: [true, 'Annual Vacation days allowed cannot be empty!']
    },

    annualSickDaysAllowed: {
        type: Number,
        required: [true, 'Annual sick days allowed cannot be empty!'],
        min: [1, 'Cannot have less than 1 sick day per year.'],
        max: [40, 'Cannot have more than 40 sick days per year.']
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