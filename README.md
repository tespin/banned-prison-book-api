# Banned Prison Books API
A JSON API for books banned in prisons within the United States — [https://banned-prison-books-api.onrender.com](https://banned-prison-books-api.onrender.com)

## Usage

### Random
Retrieve a random banned book.

[https://banned-books-api.onrender.com/api/v1/books/random](https://banned-books-api.onrender.com/api/v1/books/random)

### All
Retrieve all books in the database (48375 entries).

[https://banned-books-api.onrender.com/api/v1/books/](https://banned-books-api.onrender.com/api/v1/books/)

### Publication
Retrieve a banned book by its title.

[https://banned-books-api.onrender.com/api/v1/books?title=the%20autobiography%20of%20malcolm%20x](https://banned-books-api.onrender.com/api/v1/books?title=the%20autobiography%20of%20malcolm%20x)

### Author
Retrieve banned books by a specified author.

[https://banned-books-api.onrender.com/api/v1/books?author=malcolm%20x](https://banned-books-api.onrender.com/api/v1/books?author=malcolm%20x)

### Year
Retrieve books banned in a specific year.

[https://banned-books-api.onrender.com/api/v1/books?year=2015](https://banned-books-api.onrender.com/api/v1/books?year=2015)

### Reason
Retrieve banned books according to the reason they were banned.

[https://banned-books-api.onrender.com/api/v1/books?reason=race](https://banned-books-api.onrender.com/api/v1/books?reason=race)

### State
Retrieve all banned books in a specific state.

[https://banned-books-api.onrender.com/api/v1/books?state=az](https://banned-books-api.onrender.com/api/v1/books?state=az)

### Length
Retrieve a specified number of banned books. Can be combined with other queries.

[https://banned-books-api.onrender.com/api/v1/books?length=5](https://banned-books-api.onrender.com/api/v1/books?length=5)

### Sort
Retrieve results sorted by publication, author, year, reason, or state_arc.

[https://banned-books-api.onrender.com/api/v1/books?reason=security&sort=author](https://banned-books-api.onrender.com/api/v1/books?reason=security&sort=author)

### Order
Retrieve results sorted in a specific direction. Allowed values are asc, desc, ascending, descending, 1, and -1.

[https://banned-books-api.onrender.com/api/v1/books?publication=dragons&sort=publication&order=desc&length=10](https://banned-books-api.onrender.com/api/v1/books?publication=dragons&sort=publication&order=desc&length=10)

## Licensing
This project is licensed under the [MIT License](https://github.com/tespin/banned-prison-book-api/blob/dev/LICENSE.md).