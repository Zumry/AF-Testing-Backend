const Router = require("@koa/router");
const {createUser, getAllUser, getUserById, deleteUser, updateUser, passwordCheck} = require("../api/User.api");
const{getToken} = require('../authentication');

const router = new Router({
    prefix: '/user'
});

router.post('/login', async ctx =>{
    let user = ctx.request.body;
    let token = await getToken(user);
    ctx.response.status = 201;
    ctx.body = token;
});

router.post('/register', async ctx =>{
    let user = ctx.request.body;
    user = await createUser(user);
    ctx.response.status = 201;
    ctx.body = user;
});

router.get('/', async ctx => {
   ctx.body = await getAllUser();
});

router.get('/:id', async ctx =>{
    const id = ctx.params.id;
    ctx.body = await getUserById(id);
});

router.del('/:id', async ctx =>{
    const id = ctx.params.id;
    ctx.body = await deleteUser(id);
});

router.put('/update/:id', async ctx =>{
    let User = ctx.request.body;
    let id = ctx.params.id;
    User = await updateUser(id,User);
    ctx.response.status = 201;
    ctx.body = User;
});

router.post('/checkPassword', async ctx =>{
    let user = ctx.request.body;
    let Pass = await passwordCheck(user);
    ctx.response.status = 201;
    ctx.body = Pass;
});

module.exports = router;