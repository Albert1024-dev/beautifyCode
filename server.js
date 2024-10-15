const express = require('express');
const app = express();
const port = 8001;

const fs = require('fs');
const beautify = require('beautify');

const fileText = fs.readFileSync('./styles.css', 'utf8');
var beautified = beautify(fileText, {format: "css"});

fs.writeFileSync('beautified.css', beautified);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});