const Pool = require('pg').Pool;

const pool = new Pool({
    user:"postgres",
    host: "localhost",
    database: "TBD_StoreBook",
    password: "feather0325",
    port: 5432,
});

module.exports = pool;