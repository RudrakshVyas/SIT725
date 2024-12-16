const express = require('express');
const ShareAbiteController = require('../controllers/ShareAbiteController');

const router = express.Router();


router.post('/', ShareAbiteController.addFoodWaste);

module.exports = router;
