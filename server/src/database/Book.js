const bookDB = require('./db');
const bookCache = require('./cache');

/**
 * @openapi
 * components:
 *  schemas:
 *      Book:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  example: 63b71000fea592e110f7f237
 *              publication:
 *                  type: string
 *                  example: A Practical Guide to Dragons
 *              author:
 *                  type: string
 *                  example: Archmage Lowadar
 *              date:
 *                  type: string
 *                  example: 2012-02-10T08:00:00.000Z
 *              year:
 *                  type: integer
 *                  example: 2012
 *              month:
 *                  type: integer
 *                  example: 2
 *              day:
 *                  type: integer
 *                  example: 10
 *              reason:
 *                  type: string
 *                  example: Role Playing game
 *              state_arc:
 *                  type: string
 *                  example: mt
 */
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

        if (filterParams.sort) {
            const sortType = typeof(books[0][filterParams.sort]);
            if (filterParams.order) {
                if (filterParams.order === 'ascending' 
                    || filterParams.order === 'asc'
                    || filterParams.order == 1) {
                        books.sort( (a, b) => {
                            if (Number.isNaN(a[filterParams.sort])) {
                                return ( 
                                    a[filterParams.sort].localeCompare(b[filterParams.sort])
                                );
                            } else {
                                if (a[filterParams.sort] > b[filterParams.sort]) {
                                    return 1;
                                }
                                if (a[filterParams.sort] < b[filterParams.sort]) {
                                    return -1;
                                }
                                return 0;
                            }
                        });
                } else if (filterParams.order === 'descending' 
                    || filterParams.order === 'desc'
                    || filterParams.order == -1) {
                        books.sort( (a, b) => {
                            if (Number.isNaN(a[filterParams.sort])) {
                                return ( 
                                    a[filterParams.sort].localeCompare(b[filterParams.sort])
                                );
                            } else {
                                if (a[filterParams.sort] > b[filterParams.sort]) {
                                    return -1;
                                }
                                if (a[filterParams.sort] < b[filterParams.sort]) {
                                    return 1;
                                }
                                return 0;
                            }
                        });
                }
            } else {
                books.sort( (a, b) => {
                    if (Number.isNaN(a[filterParams.sort])) {
                        return ( 
                            a[filterParams.sort].localeCompare(b[filterParams.sort])
                        );
                    } else {
                        if (a[filterParams.sort] > b[filterParams.sort]) {
                            return 1;
                        }
                        if (a[filterParams.sort] < b[filterParams.sort]) {
                            return -1;
                        }
                        return 0;
                    }
                });
            }
        }

        if (filterParams.length) {
            books.splice(filterParams.length);
        }

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