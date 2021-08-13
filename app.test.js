const { response } = require('express');
const request = require('supertest');
const app = require('./app.js');

describe('root route', () => {
    it('returns all movies in list on /movies', (done) => {
        request(app)
        .get('/movies')
        .then((response) => {
            expect(response.status).toBe(200)
            expect(response.type).toBe('application/json');
            done();
        })
    });

    it('Should return a single entry from the database on /movies/:id where id = 1', (done) => {
        let returnedMovie1 = [{"id": 1, "title": "Midnight In Paris","runtime": 96,"release_year": 2011,"director": "Woody Allen"}];
        let returnedMovie2 = [{"id": 2, "title": "Titanic","runtime": 210, "release_year": 1997,"director": "James Cameron"}];
        let returnedMovie3 = [{"id": 3, "title": "From Paris With Love","runtime": 94,"release_year": 2010,"director": "Pierre Morel"}];

        request(app)
        .get('/movies/1')
        .then((response) => {
            expect(response.status).toBe(200)
            expect(response.type).toBe('application/json')
            expect(response.body).toEqual(returnedMovie1)
            done();
        })
        request(app)
        .get('/movies/2')
        .then((response) => {
            expect(response.status).toBe(200)
            expect(response.type).toBe('application/json')
            expect(response.body).toEqual(returnedMovie2)
            done()
        })
        request(app)
        .get('/movies/3')
        .then((response) => {
            expect(response.status).toBe(200)
            expect(response.type).toBe('application/json')
            expect(response.body).toEqual(returnedMovie3)
            done()
        })
    });

    it("returns 'Movie ID not found' & '404' status code when visiting '/movies/420' ", (done) => {
        request(app)
        .get('/movies/420')
        .then((response) => {
            expect(response.status).toBe(404)
            expect(response.type).toBe('application/json')
            expect(response.body).toEqual({"message":"Movie ID not found"})
            done();
        })
    });

    it("returns 'Invalid ID supplied' & '400' status code when visiting '/movies/foobar' ", (done) => {
        request(app)
        .get('/movies/foobar')
        .then((response) => {
            expect(response.status).toBe(400)
            expect(response.type).toBe('application/json')
            expect(response.body).toEqual({"message":"Invalid ID supplied"})
            done();
        })
    });

    it("Should return entries based on the search query when visiting /movies?title=midnight.", (done) => {
        let returnedMovie1 = [{"id": 1, "title": "Midnight In Paris","runtime": 96,"release_year": 2011,"director": "Woody Allen"}];

        request(app)
        .get('/movies?title=midnight')
        .then((response) => {
            expect(response.status).toBe(200)
            expect(response.type).toBe('application/json')
            expect(response.body).toEqual(returnedMovie1)
            done();
        })
    });

    it("Should post data.", (done) => {
        request(app)
        .post('/')
        .send({
            "id": 3,
            "title": "From Paris With Love",
            "runtime": 94,
            "release_year": 2010,
            "director": "Pierre Morel",
            })
        .then((err, res) => {
            if (err) {
                reject(new Error('An error occured with the payment service, err: ' + err))
               }
               resolve(res.body)

        })
        .then((res) => {
            expect(res.status).toBe(200)
            console.log(res)
        })
        done();
    })

})
