//Import library:
const { Client } = require("pg");


//Establish the DB_URI:
let DB_URI;
if (process.env.NODE_ENV === "test") {
    DB_URI = "postgresql://username:password@localhost:5432/biztime_test";
} else {
    DB_URI = "postgresql://username:password@localhost:5432/biztime";
}
// Create a new client instance with the connection string
const db = new Client({
    connectionString: DB_URI,
});


// Connect to the database
db.connect();

module.exports = db;
   
