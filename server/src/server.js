const express = require('express');
const path = require('path');
const v1Router = require('./v1/routes/auth');

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`listening on port ${port}`));

app.use(express.static(path.join(__dirname, '../../client/build')));

app.use('/api/v1/books', v1Router);