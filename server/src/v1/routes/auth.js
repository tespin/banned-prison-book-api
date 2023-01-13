const express = require('express');
const bookController = require('../../controllers/bookController');
const router = express.Router();

router.get('/', bookController.getAllBooks);
router.get('/random', bookController.getRandomBook);

module.exports = router;