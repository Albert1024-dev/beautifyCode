const express = require('express');
const router = express.Router();

const fileBeautifyRouter = require('./fileBeautify');

router.use('/beautify', fileBeautifyRouter);

module.exports = router;