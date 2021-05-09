const mysql = require("mysql");
const db = mysql.createConnection({
    user: "root",
    host: "35.220.154.171",
    password: "tudimatim1",
    database: "shoestore",
    timezone:"gmt",
  });

module.exports = db;