const DB = require('./db.json');
const bookDB = require('./db');

const getAllBooks = async (filterParams) => {
    try {
        let query = {};

        if (filterParams.publication) {
            const regex = new RegExp(filterParams.publication, 'i');
            query.publication = { $regex: regex };
        }

        if (filterParams.author) {
            const regex = new RegExp(filterParams.author, 'i');
            query.author = { $regex: regex };
        }

        if (filterParams.year) {
            query.year = { $eq: filterParams.year };
        }

        if (filterParams.reason) {
            const regex = new RegExp(filterParams.reason, 'i');
            query.reason = { $regex: regex };
        }

        const books = await bookDB.find(query);

        // if (filterParams.author) {
        //     query.author = filterParams.author;
        // }
        // connect to database
        // let books = DB.books;
        // const allBooks = await bookDB.find();
        // bookDB.createIndexes({ publication: "text", author: "text"})
        // let books = await bookDB.find();
        // console.log(typeof(books));

        // publication, author, year, reason, state_arc

        // filter by title
        // if (filterParams.publication) {
        //     books = await bookDB.find({ $text: { $search: filterParams.publication }});
            // books = bookDB.find({
            //     publication: { $elemMatch : }
            // })
            // books = books.filter( () => 
            //     bookDB.find({ publication: filterParams.publication })
            // );
            // books = books.filter( (book) => 
            //     book.publication.toLowerCase().includes(filterParams.publication)
            // );
        // }

        // filter by author
        // if (filterParams.author) {
        //     books = books.filter( (book) => 
        //         book.author.toLowerCase().includes(filterParams.author)
        //     );
        // }

        // filter by year
        // if (filterParams.year) {
        //     const books = await bookDB.find({ year: filterParams.year});
        //     return books;

            // return books.find( { year: filterParams.year })
            // return books.filter( (book) => 
            //     book.year = filterParams.year
            // );
            // return books.filter( (book) => 
            //     book.find( {year: filterParams.year })
            // );
            // return books.find({ year: filterParams.year });
            // return books.filter( (book) => 
            //     book.year
            // );
            // return books.find({ year: filterParams.year }).exec();
            // return books.filter( (book) => {

            // })
        // }

        // if (filterParams.state_arc) {

        // }
        
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
        return books;
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