const express = require('express');
const cookieParser = require('cookie-parser');
const config = require('./config');
const auth = require('../utils/auth');
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.use(express.json());
    
    app.use(express.urlencoded({
        extended: true
    }));

    app.use(cookieParser(config.SECRET));
 
    app.use(auth());
};