const mysql = require("mysql");
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "shoestore",
    timezone:"gmt",
  });

module.exports = db;