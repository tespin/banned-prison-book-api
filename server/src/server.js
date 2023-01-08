const express = require('express');
const path = require('path');
const v1Router = require('./v1/routes/auth');

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3001;

app.use(express.static('../../client/build'));
app.use('/api/v1/books', v1Router);
// app.listen(port, () => console.log(`listening on port ${port}`));

// app.get('/api', (req, res) => {
//     res.json({ message: "Hello from server!"});
// })