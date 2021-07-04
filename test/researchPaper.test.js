const app = require('../server');
const request = require('supertest');

let user ={
    userID:"60dda145e2c32a077ca26e4c",
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGRkYTE0NWUyYzMyYTA3N2NhMjZlNGMiLCJpYXQiOjE2MjU0Mjc4NDUsImV4cCI6MTYyNTQzMTQ0NX0.V_GJFCH6X8G_rlQ2IxhqLiXvHbPT74bGtZEXu0xe1gg"
};

describe('ResearchPaper Endpoints', () => {
    it('should fetch token for Researcher Login', async () => {
        const res = await request(app).post(`/user/login`)
            .send({
                email:'Kamal@gmail.com',
                password:'123456'
            })
        expect(res.statusCode).toEqual(201);
        console.log(res.text)
    });
   it('should create a new research submission', async () => {
        const res = await request(app)
            .post('/researchPaper/')
            .set('Authorization', 'Bearer '+user.token)
            .send({
                userID:user.userID,
                authorName:"Sunil2",
                paperTitle:"JavaScript3",
                email:"Sunil2@gmail.com",
                researchPFileLocation:"Location"
            });
        expect(res.statusCode).toEqual(200);
    });
    it('should fetch research paper of a user', async () => {
        const res = await request(app).get(`/researchPaper/${user.userID}`);
        expect(res.statusCode).toEqual(200);
    });
    it('should fetch all research paper', async () => {
        const res = await request(app).get(`/researchPaper/`);
        expect(res.statusCode).toEqual(200);
    });
    /*it('should delete a research paper', async () => {
        const res = await request(app).delete(`/researchPaper/${contactNumber}`);
        expect(res.statusCode).toEqual(200);
    });*/
});

describe('Payment for ResearchPaper Endpoints', () => {
    it('Researcher make payment for publish Research paper', async () => {
        const res = await request(app)
            .put(`/researchPaper/payment/${user.userID}`)
            .set('Authorization', 'Bearer '+user.token)
            .send({
                pStatus:"Approved",
                payment:20000

            });
        expect(res.statusCode).toEqual(200);
    });
});