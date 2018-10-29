/**
 * DB Connection string will go here
 */
const initOptions = {

    // pg-promise initialization options...

    connect(client, dc, useCount) {
        const cp = client.connectionParameters;
        console.log('Connected to database:', cp.database);
    },
    query(e) {
        console.log('QUERY:', e.query);
    }

};
require('dotenv').load();

const pgp = require('pg-promise')(initOptions);
const db = pgp(process.env.DB_URL)

module.exports = db;