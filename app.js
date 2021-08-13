// app.js
const express = require('express');
const bodyParser = require('body-parser')
const app = express();

const knex = require('knex')(require('./knexfile.js')['development']);

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World')
})

///handle the query operation here
app.get('/movies', function(req, res) {
  if(req.query.title){
    knex
    .select('*')
    .from('movies')
    .where('title', 'ilike',`%${req.query.title}%`)
    .then(data => {
      if (data.length === 0){
        return res.status(404).json({
          message:
          'Your query string returned no results'
        })
      } else {
        return res.status(200).json(data)
      }
    })
    .catch(err =>
      res.status(400).json({
        message:
          'IM BROKE, WHAT DID YOU DO?!?!'
      })
    );
  } else {
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
  }
});

app.get('/movies/:id', function(req, res){
    /* GET a movie by id */

    knex
    .select('*')
    .from('movies')
    .where('id', req.params.id)
    .then(data => {
        if (data.length === 0){
          return res.status(404).json({
            message:
            'Movie ID not found'
          })
        } else {
          return res.status(200).json(data)
        }
      })
      .catch(err =>
        res.status(400).json({
          message:
            'Invalid ID supplied'
        })
      );
})


app.post('/', function(req, res){
  knex
  .insert({"title": req.body.title, "runtime": req.body.runtime, "release_year": req.body.release_year, "director": req.body.director})
  .into('movies')
  .then(data => res.status(200).json(data))
  .then(console.log("post request complete"))



  //knex.insert({"title": req.body.title, "runtime": req.body.runtime, "release_year": req.body.release_year, "director": req.body.director}).into('movies')

  // {
  //   "id": 3,
  //   "title": "From Paris With Love",
  //   "runtime": 94,
  //   "release_year": 2010,
  //   "director": "Pierre Morel",
  //   }
})



// app.delete()


module.exports = app;

