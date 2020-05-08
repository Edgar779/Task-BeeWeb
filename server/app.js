const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./controller/routes');
const morgan = require('morgan');
const path = require('path');
const jwt = require('jsonwebtoken');
const db = require("./models");
var cors = require('cors')

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors())

db.sequelize.sync();


app.use(morgan('dev'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.use(routes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`server is working on port ${PORT}`);
})