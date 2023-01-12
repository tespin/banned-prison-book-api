const bookService = require('../services/bookService');

// request all books, passing in parameters
const getAllBooks = async (req, res) => {
    // extract params from req.query and build params object
    const { publication, author, year, reason, state_arc, length } = req.query;
    try {
        // pass in params and get all books
        const allBooks = await bookService.getAllBooks({ publication, author, year, reason, state_arc, length });
        // send json object with books
        res.send({ status: 'OK', data: allBooks });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
}

const getRandomBook = async (req, res) => {
    const randomBook = await bookService.getRandomBook();
    res.send({ status: 'OK', data: randomBook});;
}

module.exports = {
    getAllBooks,
    getRandomBook
};