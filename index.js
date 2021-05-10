const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require('express-fileupload');
const path = require('path');
//
app.use(cors());
app.use(express.json());
app.use(fileUpload());


app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(process.env.PORT || 3000, () => {
  console.log("Yey, your server is running on port " + process.env.PORT);
});