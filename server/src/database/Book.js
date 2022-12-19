const DB = require('./db.json');

const getAllBooks = () => {
    return DB.books;
};

const getRandomBook = () => {
    const randomBook = DB.books[Math.floor(Math.random() * DB.books.length)];
    return randomBook;
}

module.exports = { 
    getAllBooks,
    getRandomBook
};