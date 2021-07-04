const app = require('../server');
const request = require('supertest');

let user ={
    userID:"60b13b6af661ea742a121d39",
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGRkYjhjOGE4N2Q5ZjNlNzkzNjRmNjAiLCJpYXQiOjE2MjU0MzU0MTAsImV4cCI6MTYyNTQzOTAxMH0._Yk3_eyg5HdNlUQr3ZPjcZzg69T5VwYm1pWiify2-MY"
};

describe('Workshop Conductor Login Endpoints', () => {
    it('should fetch token for Workshop Conductor Login', async () => {
        const res = await request(app).post(`/user/login`)
            .send({
                email:'Nimal@gmail.com',
                password:'123456789'
            })
        expect(res.statusCode).toEqual(201);
        console.log(res.text)
    });
});

describe('Workshop Endpoints', () => {
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