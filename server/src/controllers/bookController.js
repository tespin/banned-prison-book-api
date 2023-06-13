const bookService = require('../services/bookService');

// request all books, passing in parameters
const getAllBooks = async (req, res) => {
    
    // extract params from req.query and build params object
    const { publication, author, year, reason, state_arc, length, sort, order } = req.query;
    try {
        // pass in params and get all books
        const allBooks = await bookService.getAllBooks({ publication, author, year, reason, state_arc, length, sort, order });
        
        // send json object with books
        res
            .status(200)
            .send({ data: allBooks });
    } catch (error) { // use optional chaining to send error.status if error exists, else 500
        res
            .status(error?.status || 500)
            .send({ data: { error: error?.message || error } });
    }
}

const getRandomBook = async (req, res) => {
    try {
        const randomBook = await bookService.getRandomBook();
        res
            .status(200)
            .send({ data: randomBook});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ data: { error: error?.message || error } });
    }
}

module.exports = {
    getAllBooks,
    getRandomBook
};