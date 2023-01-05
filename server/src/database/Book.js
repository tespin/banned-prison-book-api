const DB = require('./db.json');
const bookDB = require('./db');

const getAllBooks = async (filterParams) => {
    try {
        // connect to database
        // let books = DB.books;
        // const allBooks = await bookDB.find();
        const books = await bookDB.find();

        // publication, author, year, reason, state_arc

        // filter by title
        if (filterParams.publication) {
            return books.filter( (book) => 
                book.publication.toLocaleLowerCase.includes(filterParams.publication)
            );
        }

        // filter by author
        if (filterParams.author) {
            return books.filter( (book) => 
                book.author.toLowerCase().includes(filterParams.author)
            );
        }
        
        // filter by title
        // if (filterParams.title) {
        //     return DB.books.filter( (book) => 
        //         book.title.toLowerCase().includes(filterParams.title)
        //     );
        // }

        // filter by author
        // if (filterParams.author) {
        //     return DB.books.filter( (book) => 
        //         book.author.toLowerCase().includes(filterParams.author)
        //     );
        // }

        // filter by isbn
        // if (filterParams.isbn) {
        //     return DB.books.filter( (book) => 
        //         book.isbn.toLowerCase().includes(filterParams.isbn)
        //     );
        // }

        // filter by genre
        // if (filterParams.genre) {
        //     return DB.books.filter((book) => 
        //         book.genre
        //             .map((genre) => genre.toLowerCase())
        //             .includes(filterParams.genre)
        //     );
        // }

        // filter by date
        // if (filterParams.date) {
        //     return DB.books.filter( (book) => 
        //         book.date.toLowerCase().includes(filterParams.date)
        //     );
        // }

        // filter by state
        // if (filterParams.state) {
        //     return DB.books.filter( (book) => 
        //         book.state.toLowerCase().includes(filterParams.state)
        //     );
        // }

        // filter by ban type
        // if (filterParams.banType) {
        //     return DB.books.filter( (book) =>
        //         book.banType.toLowerCase().includes(filterParams.banType)
        //     );
        // }
        
        // if no params specified, return all books
        return allBooks;
    } catch (error) {
        throw { status: 500, message: error };
    }
};

const getRandomBook = async () => {
    // pick random book in database
    const books = await bookDB.find();
    const randomBook = books[Math.floor(Math.random() * books.length)]
    return randomBook;
}

module.exports = { 
    getAllBooks,
    getRandomBook
};