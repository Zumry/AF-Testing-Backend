const Router = require("@koa/router");
const {adminCreateUser} = require("../api/AdminCreateUser.api");
const{verifyAdmin} = require('../authentication');
const router = new Router({
    prefix: '/adminRegisterUser'
});

router.post('/',verifyAdmin, async ctx =>{
    let user = ctx.request.body;
    user = await adminCreateUser(user);
    ctx.response.status = 201;
    ctx.body = user;
});


module.exports = router;