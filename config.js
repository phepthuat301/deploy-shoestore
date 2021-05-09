const mysql = require("mysql");
const db = mysql.createConnection({
    user: "root",
    host: "113.165.38.131",
    password: "",
    database: "shoestore",
    timezone:"gmt",
  });

module.exports = db;