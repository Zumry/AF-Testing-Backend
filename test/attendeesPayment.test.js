const app = require('../server');
const request = require('supertest');
const TicketId = require('uuid');

let user ={
    userID:"60e20fabbffb491194e03df5",
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MGRkYTE0NWUyYzMyYTA3N2NhMjZlNGMiLCJpYXQiOjE2MjU0MjIzMDcsImV4cCI6MTYyNTQyNTkwN30.1L0Dg1SVOF5etqAm_G_dSd3I0QOK2RBpNBnBgPi-nqc"
};

describe('Attendees Payment Endpoints', () => {
    it('should fetch token for Attendee Login', async () => {
        const res = await request(app).post(`/user/login`)
            .send({
                email:'Nimal@gmail.com',
                password:'12345678'
            })
        expect(res.statusCode).toEqual(201);
        console.log(res.text);
    });
    it('should create a new Attendee payment submission', async () => {
        const res = await request(app)
            .post('/pay/')
            .set('Authorization', 'Bearer '+user.token)
            .send({
                userID:user.userID,
                payment:"1500",
                payDate: new Date().toISOString().slice(0, 10),
                ticketID: TicketId.v4()
            });
        expect(res.statusCode).toEqual(200);
    });

    // it('should fetch research paper of a user', async () => {
    //     const res = await request(app).get(`/researchPaper/${user.userID}`);
    //     expect(res.statusCode).toEqual(200);
    // });
    // it('should fetch all research paper', async () => {
    //     const res = await request(app).get(`/researchPaper/`);
    //     expect(res.statusCode).toEqual(200);
    // });
    /*it('should delete a research paper', async () => {
        const res = await request(app).delete(`/researchPaper/${contactNumber}`);
        expect(res.statusCode).toEqual(200);
    });*/
});