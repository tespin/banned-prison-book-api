const bookService = require('../services/bookService');

// request all books, passing in parameters
const getAllBooks = (req, res) => {
    // extract params from req.query and build params object
    const { title, author, isbn } = req.query;
    try {
        // pass in params and get all books
        const allBooks = bookService.getAllBooks({ title, author, isbn });
        
        // send json object with books
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