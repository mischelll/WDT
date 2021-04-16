const User = require('../models/User');

const roleService = require('./roleService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken-promisified');
const { SECRET } = require('../config/config');

function register(userData) {
    console.log(userData);

    let { username, password, repeatPassword, annualVacationDaysAllowed, annualSickDaysAllowed, email, paymentPerDay } = userData;

    return User.findOne().or([{ username: username }, { email: email }])
        .exec()
        .then(user => {
            let errorMessages = [];
            console.log(user);
            if (password !== repeatPassword) {
                errorMessages.push({ errorMessage: "Password mismatch!" })
            }

            if (user && user.username === username) {
                errorMessages.push({ errorMessage: "Username should be unique" })
            }

            if (user && user.email === email) {
                errorMessages.push({ errorMessage: "Email should be unique" })
            }

            if(!annualVacationDaysAllowed){
                errorMessages.push({ errorMessage: "Annual Vacation days must be at least 1" })
            }

            if(!annualSickDaysAllowed){
                errorMessages.push({ errorMessage: "Annual Sick days must be at least 1" })
            }

            console.log(+paymentPerDay > 31);
            console.log(paymentPerDay === '');
            if(paymentPerDay === '' || Number(paymentPerDay) <= 31.00){
                errorMessages.push({ errorMessage: "Payment per day cannot be less than 31 leva" })
            }
            if (errorMessages.length > 0) {
                return Promise.reject(errorMessages);
            }

            let createdUser = new User({
                username,
                password,
                email,
                annualVacationDaysAllowed,
                annualSickDaysAllowed
            });


            Promise.resolve(roleService.getRoleByName('ROLE_USER'))
                .then(role => {
                    createdUser.roles.push(role._id);
                })

            return createdUser.save();
        })
        .then(registeredUser => {
            return registeredUser;
        })
        .catch((error) => {
            console.log(error);

            throw error;
        });
};

function login(userData) {
    let { username, password } = userData;
    return User.findOne()
        .where({ username: username })
        .then(user => {
            if (!user) {
                return Promise.reject(new Error('Wrong credentials!'))
            }
            return Promise.all([bcrypt.compare(password, user.password), user]);
        })
        .then(data => {
            let areEqual = data[0];
            let user = data[1];

            if (!areEqual) {
                return Promise.reject(new Error('Wrong credentials!'))
            }

            let roles = [];
            roles.push(user.roles[0])

            return jwt.sign({ _id: user._id, username: user.username, email: user.email, roles: roles }, SECRET, { expiresIn: '24h' });
        })
        .catch(err => {
            throw [{ message: err.message, status: 401 }];
        });
};

module.exports = {
    register,
    login
};