const app = require('../server');
const request = require('supertest');

let user ={
    userID:"60dda145e2c32a077ca26e4c",
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGRkYTE0NWUyYzMyYTA3N2NhMjZlNGMiLCJpYXQiOjE2MjU0MjIzMDcsImV4cCI6MTYyNTQyNTkwN30.1L0Dg1SVOF5etqAm_G_dSd3I0QOK2RBpNBnBgPi-nqc"
};

describe('Workshop Endpoints', () => {
    it('should fetch token for Workshop Conductor Login', async () => {
        const res = await request(app).post(`/user/login`)
            .send({
                email:'Nimal@gmail.com',
                password:'123456'
            })
        expect(res.statusCode).toEqual(201);
    });
    it('should create a new Workshop', async () => {
        const res = await request(app)
            .post('/workShop/')
            .set('Authorization', 'Bearer '+user.token)
            .send({
                userID:user.userID,
                presenterName:"Kamal",
                workShopTitle:"Java For Beginners",
                email:"Nimal@gmail.com",
                affiliation:"SLIIT",
                contactNumber:"0752146871",
                conductorNames:["Nimal","Sunil"],
                fileLocation:"Location"
            });
        expect(res.statusCode).toEqual(200);
    });
    it('should fetch Workshop submission of a user', async () => {
        const res = await request(app).get(`/workShop/${user.userID}`);
        expect(res.statusCode).toEqual(200);
    });
    it('should fetch all Workshop submissions', async () => {
        const res = await request(app).get(`/workShop/`);
        expect(res.statusCode).toEqual(200);
    });
    /*it('should delete a research paper', async () => {
        const res = await request(app).delete(`/researchPaper/${contactNumber}`);
        expect(res.statusCode).toEqual(200);
    });*/
});