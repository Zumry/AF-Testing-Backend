const app = require('../server');
const request = require('supertest');

describe('Register Endpoints', () => {

    it('should create a new user', async () => {
        const res = await request(app)
            .post('/register/')
            .send({
                fullName:"Nimal",
                email:"Nimal@gmail.com",
                type:"Attendee",
                password:"12345678"
            });
        expect(res.statusCode).toEqual(200);
    });

    it('should fetch all users submissions', async () => {
        const res = await request(app).get(`/`);
        expect(res.statusCode).toEqual(200);
    });
});


describe('Login Endpoints', () => {
    it('should fetch token for Researcher Login', async () => {
        const res = await request(app).post(`/user/login`)
            .send({
                email:'Nimal@gmail.com',
                password:'12345678'
            })
        expect(res.statusCode).toEqual(201);
    });

});