const DB = require('./db.json');

const getAllBooks = (filterParams) => {
    try {
        let books = DB.books;
        if (filterParams.author) {
            return DB.books.filter( (book) => 
                book.author.toLowerCase().includes(filterParams.author)
            );
        }

        if (filterParams.isbn) {
            return DB.books.filter( (book) => 
                book.isbn.toLowerCase().includes(filterParams.isbn)
            );
        }
        return books;
    } catch (error) {
        throw { status: 500, message: error };
    }

    // return DB.books;
};

const getRandomBook = () => {
    const randomBook = DB.books[Math.floor(Math.random() * DB.books.length)];
    return randomBook;
}

module.exports = { 
    getAllBooks,
    getRandomBook
};