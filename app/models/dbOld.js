const mysql = require("mysql");

const oldConnection = mysql.createConnection({
   //    host: "10.0.0.254",
   //    user: "signupapp",
   //    password: "Aa123123!@",
   host: "localhost",
   user: "root",
   password: "vA47u2Byx5LmbjDj",
   database: "portal",
   port: 3306,
});

oldConnection.connect((error) => {
   if (error) throw error;
   console.log("Successfully connected to the database 2.");
});

module.exports = oldConnection;
