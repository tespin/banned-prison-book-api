const express = require('express');
const bookController = require('../../controllers/bookController');
const router = express.Router();

/**
 * @openapi
 * /api/v1/books:
 *  get:
 *      tags:
 *          - Books
 *      parameters:
 *          - in: query
 *            name: publication
 *            schema:
 *                type: string
 *            description: The title of a book
 *          - in: query
 *            name: author
 *            schema:
 *                type: string
 *            description: The author of a book
 *          - in: query
 *            name: year
 *            schema:
 *                type: integer
 *            description: The year the book was banned
 *          - in: query
 *            name: reason
 *            schema:
 *                type: string
 *            description: The reason provided by the state's Department of Corrections for banning the book
 *          - in: query
 *            name: state_arc
 *            schema:
 *                type: string
 *            description: The state in which the book was banned
 *          - in: query
 *            name: length
 *            schema:
 *                type: integer
 *            description: The number of results to return
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: OK
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Book'
 *          5XX:
 *              description: FAILED
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: FAILED
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      error:
 *                                          type: string
 *                                          example: "Error message"
 */
router.get('/', bookController.getAllBooks);

/**
 * @openapi
 * /api/v1/books/random:
 *  get:
 *      tags:
 *          - Books
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: OK
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/Book'
 *          5XX:
 *              description: FAILED
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: FAILED
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      error:
 *                                          type: string
 *                                          example: "Error message"
 */
router.get('/random', bookController.getRandomBook);

module.exports = router;