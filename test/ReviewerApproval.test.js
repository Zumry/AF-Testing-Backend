const app = require('../server');
const request = require('supertest');

let user ={
    userID:"60e21549b5a3f43378feb255",
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGRkYTE0NWUyYzMyYTA3N2NhMjZlNGMiLCJpYXQiOjE2MjU0Mjc4NDUsImV4cCI6MTYyNTQzMTQ0NX0.V_GJFCH6X8G_rlQ2IxhqLiXvHbPT74bGtZEXu0xe1gg"
};

describe('Reviewer ResearchPaper Approval Endpoints', () => {
    it('Approval of Research paper submission', async () => {
        const res = await request(app).post(`/user/login`)
            .send({
                email:'re@gmail.com',
                password:'123456789'
            })
        expect(res.statusCode).toEqual(201);
        console.log(res.text)
    });
    it('Approve research submission', async () => {
        const res = await request(app)
            .post(`/researchPaper/approval/${user.userID}`)
            .set('Authorization', 'Bearer '+user.token)
            .send({
                aStatus:"Approved",

            });
        expect(res.statusCode).toEqual(200);
    });
});

describe('Reviewer Workshop Approval Endpoints', () => {
    it('Approval of Workshop submission', async () => {
        const res = await request(app)
            .post(`/workShop/approval/${user.userID}`)
            .set('Authorization', 'Bearer '+user.token)
            .send({
                aStatus:"Approved"

            });
        expect(res.statusCode).toEqual(200);
    });
});