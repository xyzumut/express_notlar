const express = require('express');
const router = express.Router();
const GenelController = require('../controllers/GenelController');

router.get('/error-deneme', GenelController.errorDeneme);

module.exports = router;