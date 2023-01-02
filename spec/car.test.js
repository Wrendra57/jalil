const app = require('../app/index');
const request = require('supertest');
const { JsonWebTokenError } = require('jsonwebtoken');
const models = require('../app/models');
const Car = models.Car;
let token = '';

beforeAll(async () => {
    const credentialsLogin = {
        email: 'johnny@binar.co.id',
        password: '123456'
    }

    const response = await request(app).post('/v1/auth/login').send(credentialsLogin);

    token = response.body.accessToken;
});

describe('GET /', () => {
    it('return 200 ok', (done) => {
        request(app)
        .get('/')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done)
    });
});

describe('GET /v1/cars', () => {
    it('return 200 ok', (done) => {
        request(app)
        .get('/v1/cars')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done)
    });
});

describe('POST /v1/cars', () => {
    it('return 201 created', async () => {
        const payload = {
            name: "Pajero Test",
            price: 200000,
            size: "medium",
            image: "www.google.com"
        };

        await request(app)
        .post('/v1/cars')
        .set({
            Authorization: `Bearer ${token}`
        })
        .set(payload)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(201)
    });
});

// ADD TEST UPDATE CARS
// Write your code here..
// describe('PUT /v1/cars/:id', () =>{
//     it('return 200 updated', async () => {
//         const car1 = {
//             name: "Civic",
//             price: 200000,
//             size: "Large",
//             image: "www.google.com"
//         };
//         const car1update = {
//             name: "Civic New",
//             price: 250000,
//             size: "Medium",
//             image: "www.youtube.com"
//         };
//         const car = await Car.create(car1);
//         await request(app)
//         .put('/v1/cars' + car.id)
//         .set({
//             Authorization: `Bearer ${token}`
//         })
//         .send(car1update)
//         .expect('Content-Type', 'application/json; charset=utf-8')
//         .expect(200)
//     });
// });

describe('PUT /v1/cars/:id', () =>{
    const car1 = {
        name: "Civic",
        price: 200000,
        size: "Large",
        image: "www.google.com"
    };

    const car1update = {
        name: "Civic New",
        price: 250000,
        size: "Medium",
        image: "www.youtube.com"
    };

    it('return 200 updated', async () => {
        const car = await Car.create(car1);
        await request(app)
        .put('/v1/cars/' + car.id)
        .set({
            Authorization: `Bearer ${token}`
        })
        .send(car1update)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
    });
});

// ADD TEST DELETE CARS
// Write your code here..
describe('DELETE /v1/cars/:id', () => {
    it('return 204 deleted', async () =>{
        const car = await Car.create({
            name: "Toyota",
            price: "100000",
            size: "medium",
            image: "www.google.com"
        });
        request(app)
        .delete('/v1/cars/' + car.id)
        .set({
            Authorization: `Bearer ${token}`
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(204)
    });
});