const express = require('express');
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');
const config = require('./config/config');
const routes = require('./routes');

const app = express();

expressConfig(app);
databaseConfig(app);
app.use(routes);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`));