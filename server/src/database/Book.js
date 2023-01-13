// const DB = require('./db.json');
const bookDB = require('./db');
const bookCache = require('./cache');

const getAllBooks = async (filterParams) => {
    try {
        // let books = await bookDB.find();
        let books;
        
        const cached = await bookCache.get('books');
        if (cached) {
            books = JSON.parse(cached);
        } else {
            books = await bookDB.find();
            await bookCache.setex('books', 86400, JSON.stringify(books));
        }

        if (filterParams.publication) {
            const regex = new RegExp(filterParams.publication, 'i');
            books = books.filter( (book) => book.publication.match(regex));
        }

        if (filterParams.author) {
            const regex = new RegExp(filterParams.author, 'i');
            books = books.filter( (book) => book.author.match(regex));
        }

        if (filterParams.year) {
            books = books.filter( (book) => book.year == filterParams.year);
        }

        if (filterParams.reason) {
            const regex = new RegExp(filterParams.reason, 'i');
            books = books.filter( (book) => book.reason.match(regex));
        }

        if (filterParams.state_arc) {
            const regex = new RegExp(`^${filterParams.state_arc}$`);
            books = books.filter( (book) => book.state_arc.match(regex));
        }

        if (filterParams.length) {
            books.splice(filterParams.length);
        }

        // if no params specified, return all books
        return books;
        
        // let query = {};

        // if (filterParams.publication) {
        //     const regex = new RegExp(filterParams.publication, 'i');
        //     query.publication = { $regex: regex };
        // }

        // if (filterParams.author) {
        //     const regex = new RegExp(filterParams.author, 'i');
        //     query.author = { $regex: regex };
        // }

        // if (filterParams.year) {
        //     query.year = { $eq: filterParams.year };
        // }

        // if (filterParams.reason) {
        //     const regex = new RegExp(filterParams.reason, 'i');
        //     query.reason = { $regex: regex };
        // }

        // if (filterParams.state_arc) {
        //     const regex = new RegExp(`^${filterParams.state_arc}$`);
        //     query.state_arc = { $regex: regex };
        // }

        // if (filterParams.length) {
        //     books.splice(filterParams.length);
        // }

        // if no params specified, return all books
        // return books;
    } catch (error) {
        throw { status: 500, message: error };
    }
};

const getRandomBook = async () => {
    // pick random book in database
    // const books = await bookDB.find();

    // let books = await bookDB.find();
    let books;
        
    const cached = await bookCache.get('books');
    if (cached) {
        books = JSON.parse(cached);
    } else {
        books = await bookDB.find();
        await bookCache.setex('books', 5, JSON.stringify(books));
    }

    const randomBook = books[Math.floor(Math.random() * books.length)]
    return randomBook;
}

module.exports = { 
    getAllBooks,
    getRandomBook
};