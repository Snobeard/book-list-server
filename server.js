'use strict';

const pg = require('pg');
const express = require('express');
// const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

// const conString = 'postgres://postgres:1234@localhost:5432/postgres';
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

app.get('/test', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
