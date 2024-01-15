const express = require('express');
const cors = require('cors')
const app = express();
var bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const sesssion = require('express-session');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose');
const MongoStore = require('connect-mongo');
app.use(express.json());
app.use(cors())

app.use(bodyParser.json());
app.use(express.urlencoded());

app.use('/', require('./routes'));
app.use(cookieParser());
app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});