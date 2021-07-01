const Router = require("@koa/router");

const {createAttendeesPayment, getAllPayment, getPaymentById, deletePayment, getTicketsByUser} = require('../api/AttendeesPayment.api');
const {verifyAttendees} = require('../authentication');
const router = new Router({
    prefix: '/attendees'
});

router.post('/pay',verifyAttendees, async ctx => {
    // let userId = ctx.request.jwtPayload.sub;
    let payment = ctx.request.body;
    payment = await createAttendeesPayment(payment);
    ctx.response.status = 201;
    ctx.body = payment;
});

router.get('/', async ctx => {
    ctx.body = await getAllPayment();
});

router.get('/:id', async ctx => {
    const id = ctx.params.id;
    ctx.body = await getPaymentById(id);
});

router.del('/:id',verifyAttendees, async ctx =>{
    const id = ctx.params.id;
    ctx.body = await deletePayment(id);
});

router.get('/ticket/:id', async ctx => {
    const id = ctx.params.id;
    ctx.body = await getTicketsByUser(id);
});

module.exports = router;
