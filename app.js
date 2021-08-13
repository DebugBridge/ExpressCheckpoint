// app.js
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 3000;

const knex = require('knex')(require('./knexfile.js')['development']);

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/movies', function(req, res) {
  knex
    .select('*')
    .from('movies')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

// app.post()

// app.delete()

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});