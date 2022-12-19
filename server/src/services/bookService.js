const Book = require('../database/Book');

const getAllBooks = () => {
    const allBooks = Book.getAllBooks();
    return allBooks;
};

const getRandomBook = () => {
    const randomBook = Book.getRandomBook();
    return randomBook;
};

module.exports = {
    getAllBooks,
    getRandomBook
};