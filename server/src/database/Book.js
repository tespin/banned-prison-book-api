const DB = require('./db.json');

const getAllBooks = (filterParams) => {
    try {
        // connect to database
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

        // filter by genre
        if (filterParams.genre) {
            return DB.books.filter((book) => 
                book.genre
                    .map((genre) => genre.toLowerCase())
                    .includes(filterParams.genre)
            );
        }

        // filter by date
        if (filterParams.date) {
            return DB.books.filter( (book) => 
                book.date.toLowerCase().includes(filterParams.date)
            );
        }

        // filter by state
        if (filterParams.state) {
            return DB.books.filter( (book) => 
                book.state.toLowerCase().includes(filterParams.state)
            );
        }

        // filter by ban type
        if (filterParams.banType) {
            return DB.books.filter( (book) =>
                book.banType.toLowerCase().includes(filterParams.banType)
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