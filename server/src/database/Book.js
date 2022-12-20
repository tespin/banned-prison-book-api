const DB = require('./db.json');

const getAllBooks = (filterParams) => {
    try {
        let books = DB.books;
        
        // filter by title
        if (filterParams.title) {
            return DB.books.filter( (book) => 
                book.title.toLowerCase().includes(filterParams.title)
            );
        }

        // filter by author
        if (filterParams.author) {
            return DB.books.filter( (book) => 
                book.author.toLowerCase().includes(filterParams.author)
            );
        }

        // filter by isbn
        if (filterParams.isbn) {
            return DB.books.filter( (book) => 
                book.isbn.toLowerCase().includes(filterParams.isbn)
            );
        }
        
        // if no params specified, return all books
        return books;
    } catch (error) {
        throw { status: 500, message: error };
    }
};

const getRandomBook = () => {
    // pick random book in database
    const randomBook = DB.books[Math.floor(Math.random() * DB.books.length)];
    return randomBook;
}

module.exports = { 
    getAllBooks,
    getRandomBook
};