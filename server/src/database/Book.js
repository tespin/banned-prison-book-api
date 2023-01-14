const bookDB = require('./db');
const bookCache = require('./cache');

const getAllBooks = async (filterParams) => {
    try {
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
            const stateToAbbrev = {
                'arizona': 'az',
                'california': 'ca',
                'connecticut': 'ct',
                'florida': 'fl',
                'georgia': 'ga',
                'iowa': 'ia',
                'illinois': 'il',
                'kansas': 'ks',
                'michigan': 'mi',
                'montana': 'mt',
                'north carolina': 'nc',
                'new jersey': 'nj',
                'oregon': 'or',
                'rhode island': 'ri',
                'south carolina': 'sc',
                'texas': 'tx',
                'virginia': 'va',
                'wisconsin' : 'wi'
            }

            if (filterParams.state_arc.length > 2) {
                const val = stateToAbbrev[filterParams.state_arc.toLowerCase()];
                regex = new RegExp(`^${val}$`, 'i');
            } else {
                regex = new RegExp(`^${filterParams.state_arc}$`, 'i');
            }

            books = books.filter( (book) => book.state_arc.match(regex));
        }

        if (filterParams.length) {
            books.splice(filterParams.length);
        }

        // if (filterParams.sort) {
        //     // let field = filterParams.sort;
        //     // let sortObj = { field : filterParams.order }
        //     // books.sort(sortObj);
        //     // console.log(filterParams.sort);
        //     books.sort({ 
        //         [filterParams.sort] : filterParams.order
        //     });
        // }

        // if no params specified, return all books
        return books;
    } catch (error) {
        throw { status: 500, message: error };
    }
};

const getRandomBook = async () => {
    let books;
        
    const cached = await bookCache.get('books');
    if (cached) {
        books = JSON.parse(cached);
    } else {
        books = await bookDB.find();
        await bookCache.setex('books', 86400, JSON.stringify(books));
    }

    const randomBook = books[Math.floor(Math.random() * books.length)]
    return randomBook;
}

module.exports = { 
    getAllBooks,
    getRandomBook
};