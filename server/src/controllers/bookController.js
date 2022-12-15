const bookService = require('../services/bookService');

const getAllBooks = (req, res) => {
    const allBooks = bookService.getAllBooks();
    res.send('Get all books');
}

const getRandomBook = (req, res) => {
    const randomBook = bookService.getRandomBook();
    res.send('Get random book');
}

module.exports = {
    getAllBooks,
    getRandomBook
};