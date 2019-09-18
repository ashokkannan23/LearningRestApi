const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Error = require('./error/error');


mongoose.connect('mongodb://localhost/newkey', {useNewUrlParser: true},);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));


var app = express();
// TODO: Configure this properly when domain name is registered.
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const propertyRoute = require('./routes/facility');
app.use('/facility', propertyRoute);


// Catch 404 error
app.use((req, res, next) => {
    res.status(404).send('Resource not found');
});

//Catch all error
app.use((err, req, res, next) => {
    console.log("Error at Server.JS: ", err);
    if (!(err instanceof Error)) return res.status(500).json({message: 'Server Error'});
    res.status(err.code).json(err.response);
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server listening on port ${PORT}.`));
