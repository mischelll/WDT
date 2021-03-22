const mongoose = require('mongoose');
const config = require('./config');

module.exports = (app) => {
    mongoose.connect(config.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
    mongoose.set('debug', true);
    
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'Connection error!'));

    db.once('open', console.log.bind(console, 'Database connected!'));
};
