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

const pgp = require('pg-promise')(initOptions);

const db = pgp('postgres://localhost:5432/dummy')

module.exports = db;