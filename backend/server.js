const express = require('express');
const cors = require('cors')
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');
const config = require('./config/config');
const routes = require('./routes');
const morgan = require('morgan');
const winston = require('./config/winston');

const app = express();

app.use(cors());
app.options('*', cors());

expressConfig(app);

databaseConfig(app);

app.use(morgan('combined', { stream: winston.stream }));
app.use(routes);



app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`));