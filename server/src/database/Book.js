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
  // we try to get all books, or all books that match the filters provided in a request
  try {
    let books;

    // we first check the cache to see if data is available
    const cached = await bookCache.get('books');

    if (cached) {
      // on a cache hit, we obtain the cached data
      books = JSON.parse(cached);
    } else {
      // on a cache miss, we query the database and then populate the cache with the retrieved data
      books = await bookDB.find();
      await bookCache.setex('books', 86400, JSON.stringify(books));
    }

    // query by publication (title)
    if (filterParams.publication) {
      const regex = new RegExp(filterParams.publication, 'i');
      books = books.filter((book) => book.publication.match(regex));
    }

    // query by author
    if (filterParams.author) {
      const regex = new RegExp(filterParams.author, 'i');
      books = books.filter((book) => book.author.match(regex));
    }

    // query by the year a text was banned
    if (filterParams.year) {
      books = books.filter((book) => book.year === filterParams.year);
    }

    // query based on the reason a text was banned
    if (filterParams.reason) {
      const regex = new RegExp(filterParams.reason, 'i');
      books = books.filter((book) => book.reason.match(regex));
    }

    /* 
            This block checks the length of state_arc to determine if the request
            is using the full state name or its abbreviation. If the full name, we
            pull out the appropriate abbreviation and use that in a regex search.
        */
    if (filterParams.state_arc) {
      if (filterParams.state_arc.length > 2) {
        const val = stateToAbbrev[filterParams.state_arc.toLowerCase()];
        regex = new RegExp(`^${val}$`, 'i');
      } else {
        regex = new RegExp(`^${filterParams.state_arc}$`, 'i');
      }

      books = books.filter((book) => book.state_arc.match(regex));
    }

    // sort the results, with an optional order parameter
    if (filterParams.sort) {
      if (filterParams.order) {
        // construct arrays holding accepted parameters for the order
        const upOrder = ['ascending', 'asc', '1'];
        const downOrder = ['descending', 'desc', '-1'];

        // check if the order is ascending or descending
        if (upOrder.includes(filterParams.order)) {
          books.sort((a, b) => {
            // when sorting string fields, use localeCompare
            if (Number.isNaN(a[filterParams.sort])) {
              return a[filterParams.sort].localeCompare(b[filterParams.sort]);
            } else {
              return a[filterParams.sort] < b[filterParams.sort]
                ? -1
                : a[filterParams.sort] > b[filterParams.sort]
                ? 1
                : 0;
            }
          });
        } else if (downOrder.includes(filterParams.order)) {
          books.sort((a, b) => {
            if (Number.isNaN(a[filterParams.sort])) {
              return b[filterParams.sort].localeCompare(a[filterParams.sort]);
            } else {
              return b[filterParams.sort] < a[filterParams.sort]
                ? -1
                : b[filterParams.sort] > a[filterParams.sort]
                ? 1
                : 0;
            }
          });
        }
      } else {
        books.sort((a, b) => {
          if (Number.isNaN(a[filterParams.sort])) {
            return a[filterParams.sort].localeCompare(b[filterParams.sort]);
          } else {
            return a[filterParams.sort] < b[filterParams.sort]
              ? -1
              : a[filterParams.sort] > b[filterParams.sort]
              ? 1
              : 0;
          }
        });
      }
    }

    // splices the length of the results
    if (filterParams.length) {
      books.splice(filterParams.length);
    }

    // if no params are specified, return all books
    return books;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getRandomBook = async () => {
  let books;

  try {
    const cached = await bookCache.get('books');
    if (cached) {
      books = JSON.parse(cached);
    } else {
      books = await bookDB.find();
      await bookCache.set('books', JSON.stringify(books), { EX: 86400 });
    }

    console.log(books[0]);
    const randomBook = books[Math.floor(Math.random() * books.length)];
    return randomBook;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

module.exports = {
  getAllBooks,
  getRandomBook,
};
