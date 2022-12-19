const bookService = require('../services/bookService');

const getAllBooks = (req, res) => {
    const allBooks = bookService.getAllBooks();
    res.send({ status: 'OK', data: allBooks });
}

const getRandomBook = (req, res) => {
    const randomBook = bookService.getRandomBook();
    res.send({ status: 'OK', data: randomBook});;
}

module.exports = {
    getAllBooks,
    getRandomBook
};