'use strict';

const pg = require('pg');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT;

const app = express();

const conString = 'postgres://postgres:1234@localhost:5432/postgres';
const client = new pg.Client(conString);
client.connect();

app.get('/test', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
