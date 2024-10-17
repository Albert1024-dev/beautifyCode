const express = require('express');
const app = express();

const path = require('path');

const port = 8001;

const Router = require('./routes/api');

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