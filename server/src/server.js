const express = require('express');
const path = require('path');
const v1Router = require('./v1/routes/auth');
const { swaggerDocs: V1SwaggerDocs } = require('./v1/swagger');

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
    V1SwaggerDocs(app, PORT);
});

app.use(express.static(path.join(__dirname, '../../client/build')));

app.use('/api/v1/books', v1Router);