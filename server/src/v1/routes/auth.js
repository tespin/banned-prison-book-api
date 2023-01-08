const express = require('express');
const bookController = require('../../controllers/bookController');
const router = express.Router();

router.get('/', bookController.getAllBooks);
router.get('/random', bookController.getRandomBook);
// router.post('/', (req, res) => {
//     res.send('Create a new book');
// })

module.exports = router;