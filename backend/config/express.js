const express = require('express');
const cookieParser = require('cookie-parser');
const config = require('./config');

module.exports = (app) => {
    app.use(express.urlencoded({
        extended: true
    }));

    app.use(cookieParser(config.SECRET));
};