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

        if (filterParams.state_arc) {
            const regex = new RegExp(`^${filterParams.state_arc}$`);
            query.state_arc = { $regex: regex };
        }

        const books = await bookDB.find(query);
        
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