const User = require('../models/User');

const roleService = require('./roleService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken-promisified');
const { SECRET } = require('../config/config');

function register(userData) {
    console.log(userData);

    let { username, password, repeatPassword, annualVacationDaysAllowed, annualSickDaysAllowed, email } = userData;

    return User.findOne().or([{ username: username}, {email: email }] )
        .exec()
        .then(user => {
            if (password !== repeatPassword) {
                return Promise.reject({
                    errors: {
                        password: {
                            properties: {
                                message: "Password mismatch"
                            }
                        }
                    }
                });
            }

            if (user && user.username === username) {
                return Promise.reject({
                    errors: {
                        username: {
                            properties: {
                                message: "Username must be unique"
                            }
                        }
                    }
                });
            }

            if (user && user.email === email) {
                return Promise.reject({
                    errors: {
                        email: {
                            properties: {
                                message: "Email must be unique"
                            }
                        }
                    }
                });
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

            let roles = [];
            roles.push(registeredUser.roles[0])

            return jwt.sign({ _id: registeredUser._id, username: registeredUser.username, email: registeredUser.email, roles: roles }, SECRET, { expiresIn: '24h' });
        })
        .catch((error) => {
            console.log(error);
            let errArray = [];
            Object.keys(error.errors).map(x => errArray.push({ message: error.errors[x].properties.message }));
            console.log(errArray);

            throw errArray;
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
            throw [{ message: err.message, status: 404 }];
        });
};

module.exports = {
    register,
    login
};