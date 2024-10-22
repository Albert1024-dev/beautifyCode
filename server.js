const express = require('express');
const app = express();

const path = require('path');

const mongoose = require('mongoose');

const port = 8001;

const Router = require('./routes/api');

mongoose.connect("mongodb://localhost:27017/beautify", {
    directConnection: true,
    serverSelectionTimeoutMS: 2000,
    appName: 'mongosh'
})
    .then(() => {
        console.log("Successfully connected!");
    })
    .catch(err => {
        console.log(err);
    });

app.use('/api', Router);

app.use(express.static(path.join(__dirname, 'public')));

/**
 * @func app.listen
 * @description 'example func'
 * @param port 'params0'
 * @param ( 'params1' )
 */
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});