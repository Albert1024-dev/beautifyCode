const express = require('express');
const router = express.Router();

const beautifyController = require('../../ctrls/beautify');

router.post('/', beautifyController.beautify);

module.exports = router;