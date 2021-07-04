const app = require('../server');
const request = require('supertest');

let user ={
    userID:"60dda145e2c32a077ca26e4c",
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGRkYTE0NWUyYzMyYTA3N2NhMjZlNGMiLCJpYXQiOjE2MjU0MjIzMDcsImV4cCI6MTYyNTQyNTkwN30.1L0Dg1SVOF5etqAm_G_dSd3I0QOK2RBpNBnBgPi-nqc"
};

describe('ResearchPaper Endpoints', () => {
    it('should fetch token for Researcher Login', async () => {
        const res = await request(app).post(`/user/login`)
            .send({
                email:'Kamal@gmail.com',
                password:'123456'
            })
        expect(res.statusCode).toEqual(201);
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