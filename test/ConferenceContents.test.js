const app = require('../server');
const request = require('supertest');

let user ={
    userID:"60df31bfee244a2fe0d0244b",
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGRmMzFiZmVlMjQ0YTJmZTBkMDI0NGIiLCJpYXQiOjE2MjU0MjYwNzksImV4cCI6MTYyNTQyOTY3OX0.eoU5HO8m7MaeZCfDoDSQu_WNgYdHAUq_LfIbxPOSsLY"
};

describe('Conference Endpoints', () => {
    it('should fetch token for Editor Login', async () => {
        const res = await request(app).post(`/user/login`)
            .send({
                email:'editor123@gmail.com',
                password:'editor123'
            })
        expect(res.statusCode).toEqual(201);
        console.log(res.text);
    });
    it('should create a new Conference', async () => {
        const res = await request(app)
            .post('/')
            .set('Authorization', 'Bearer '+user.token)
            .send({
                userID:user.userID,
                creator: ' Mr.Kushira',
                conference_title: 'AF Conference',
                message: 'Spring Boot',
                status:'Approved',
                postedDate:'2021-07-10 10:00 PM'
            });
        expect(res.statusCode).toEqual(200);
    });
    it('should fetch Conference by id', async () => {
        const res = await request(app).get(`/:id'${user.userID}`);
        expect(res.statusCode).toEqual(200);
    });
    it('should fetch all Conferences ', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
    });
    /*it('should delete a Conferences, async () => {
        const res = await request(app).delete(`/Conference/${contactNumber}`);
        expect(res.statusCode).toEqual(200);
    });*/
});