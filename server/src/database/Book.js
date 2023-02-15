const bookDB = require('./db');
const bookCache = require('./cache');
const { stateToAbbrev } = require('./utils');

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
            if (filterParams.state_arc.length > 2) {
                const val = stateToAbbrev[filterParams.state_arc.toLowerCase()];
                regex = new RegExp(`^${val}$`, 'i');
            } else {
                regex = new RegExp(`^${filterParams.state_arc}$`, 'i');
            }

            books = books.filter( (book) => book.state_arc.match(regex));
        }

        if (filterParams.sort) {
            const upOrder = ['ascending', 'asc', '1'];
            const downOrder = ['descending', 'desc', '-1'];

            if (filterParams.order) {
                if (upOrder.includes(filterParams.order)) {
                        books.sort( (a, b) => {
                            if (Number.isNaN(a[filterParams.sort])) {
                                return ( 
                                    a[filterParams.sort].localeCompare(b[filterParams.sort])
                                );
                            } else {
                                return (a[filterParams.sort] < b[filterParams.sort] ? -1 : (a[filterParams.sort] > b[filterParams.sort] ? 1 : 0))
                            }
                        });
                } else if (downOrder.includes(filterParams.order)) {
                        books.sort( (a, b) => {
                            if (Number.isNaN(a[filterParams.sort])) {
                                return ( 
                                    b[filterParams.sort].localeCompare(a[filterParams.sort])
                                );
                            } else {
                                return (b[filterParams.sort] < a[filterParams.sort] ? -1 : (b[filterParams.sort] > a[filterParams.sort] ? 1 : 0))
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
                        return (a[filterParams.sort] < b[filterParams.sort] ? -1 : (a[filterParams.sort] > b[filterParams.sort] ? 1 : 0))
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