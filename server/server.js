const express = require('express');

const app = express();
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`listening on port ${port}`));

app.get('/api', (req, res) => {
    res.json({ message: "Hello from server!"});
})