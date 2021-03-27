const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        PORT: process.env.PORT || 8080,
        DB_CONNECTION: 'mongodb://localhost:27017/wdt',
        AUTH_HEADER_NAME: 'Authorization',
        SECRET: 'supersecretcookiesecret'
    },
    production: {}
};

module.exports = config[process.env.NODE_ENV.trim()]