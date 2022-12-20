const bookService = require('../services/bookService');

const getAllBooks = (req, res) => {
    const { author, isbn } = req.query;
    try {
        const allBooks = bookService.getAllBooks({ author, isbn });
        res.send({ status: 'OK', data: allBooks });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED', data: { error: error?.message || error } });
    }

    // const allBooks = bookService.getAllBooks();
    // res.send({ status: 'OK', data: allBooks });
}

const getRandomBook = (req, res) => {
    const randomBook = bookService.getRandomBook();
    res.send({ status: 'OK', data: randomBook});;
}

module.exports = {
    getAllBooks,
    getRandomBook
};