const express       = require('express');
const logger        = require('morgan');
const assignments   = require('./routes/assignments');
const employees     = require('./routes/employees');
const projects      = require('./routes/projects');

/**
 * For when we add .env file to handle DB_URLs
 */
require('dotenv').load();
require('./config/db');

const app       = express();
const port      = 5000;

app.listen(port, () => console.log(`Server running on port: ${port}`));
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/assignments', assignments);
app.use('/api/employees', employees);
app.use('/api/projects', projects);

module.exports = app;