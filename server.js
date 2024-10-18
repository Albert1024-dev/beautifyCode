const express = require('express');
const app = express();

const path = require('path');

const mongoose = require('mongoose');

const port = 8001;

const Router = require('./routes/api');

mongoose.connect("mongodb://127.0.0.1:27017/beautify")
    .then((err) => {
        if (err) console.log('Error, ' + err);
        else console.log("Successfully connected!");
    });

app.use('/api', Router);

app.use(express.static(path.join(__dirname, 'public')));

/**
 * @func app.listen
 * @description 'example func'
 * @param port 'params0'
 * @param ( 'params1'
 */
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});