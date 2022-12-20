const Book = require('../database/Book');

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

const getRandomBook = () => {
    const randomBook = Book.getRandomBook();
    return randomBook;
};

module.exports = {
    getAllBooks,
    getRandomBook
};