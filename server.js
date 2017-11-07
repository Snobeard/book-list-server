'use strict';

const pg = require('pg');
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

// const conString = 'postgres://postgres:1234@localhost:5432/postgres';
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();

app.get('/test', (req, res) => res.send('Hello World!'));

loadDB();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


function loadBooks() {
  client.query(`SELECT count(*) FROM books`)
    .then(result => {
      if (!parseInt(result.rows[0].count)){
        fs.readFile('data/books.json', function(err, file) {
          JSON.parse(file.toString()).forEach(book => {
            client.query(`
              INSERT INTO
              books(title, author, isbn, image_url, description)
                VALUES($1, $2, $3, $4, $5);`,
              [book.title, book.author, book.isbn, book.image_url, book.description]
            )
          })
        })
      }
    })
}

function loadDB() {
  client.query(`
    CREATE TABLE IF NOT EXISTS
    books (
      book_id SERIAL PRIMARY KEY,
      author VARCHAR(50),
      title VARCHAR(50),
      isbn VARCHAR(50),
      image_url TEXT,
      description TEXT
    );`
  )
    .then(data => loadBooks(data))
    .catch(err => console.log(err));
}
