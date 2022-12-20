const Book = require('../database/Book');

// obtain filtered books from database
const getAllBooks = (filterParams) => {
    try {
        const allBooks = Book.getAllBooks(filterParams);
        return allBooks;
    } catch (error) {
        throw error;
    }

    // const allBooks = Book.getAllBooks();
    // return allBooks;
};

// obtain random book
const getRandomBook = () => {
    const randomBook = Book.getRandomBook();
    return randomBook;
};

module.exports = {
    getAllBooks,
    getRandomBook
};