const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// meta information
const options = {
    definition: {
        openapi: '3.0.3',
        info: { title: 'Banned Prison Books API', version: '1.0.0' },
    },
    apis: ['./src/v1/routes/auth.js', './src/database/Book.js']
};

// json docs
const swaggerSpec = swaggerJSDoc(options);

// setup
const swaggerDocs = (app, port) => {
    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/v1/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log(
        `Version 1 Docs available at https://localhost:${port}/api/v1/docs`
    );
};

module.exports = { swaggerDocs };