const Book = require('../database/Book');

// obtain filtered books from database
const getAllBooks = async (filterParams) => {
    try {
        const allBooks = await Book.getAllBooks(filterParams);
        return allBooks;
    } catch (error) {
        throw error;
    }
};

// obtain random book
const getRandomBook = async () => {
    try {
        const randomBook =  await Book.getRandomBook();        
        return randomBook;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllBooks,
    getRandomBook
};