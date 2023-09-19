const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./config/connection.js');

const routes = require('./routes');

app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.info(`Listening on http://localhost:${PORT}`);
    });
});