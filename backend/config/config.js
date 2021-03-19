const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        PORT: process.env.PORT || 8080,
        DB_CONNECTION: 'mongodb://localhost:27017/wdt',
        AUTH_COOKIE_NAME: 'Bearer',
        SECRET: 'supersecretcookiesecret'
    },
    production: {}
};

module.exports = config[process.env.NODE_ENV.trim()]