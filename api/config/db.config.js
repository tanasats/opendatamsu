const db = require('mysql2')

const Database = db.createPool({
    host:'127.0.0.1',
    database:'opendatamsu',
    user:'root',
    password:'sudjing',
    port:3307,
	//timezone:'z'
})
module.exports = Database.promise();
