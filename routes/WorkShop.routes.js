const Router = require('@koa/router');

const {addWorkShopPaper, getAllWorkShop, getWorkShopByUserId, getWorkShopById, updateWorkShop,approvalStatus, removeWorkShopById} = require('../api/WorkShop.api');
const{verifyWorkshopConductor} = require('../authentication');

const router = new Router({
    prefix:'/workShop'
})


/**
 * Route for add Workshop proposal
 */
router.post('/',verifyWorkshopConductor,async ctx => {
    let workShop = ctx.request.body;
    workShop = await addWorkShopPaper(workShop);
    ctx.response.state = 201;
    ctx.body = workShop;
})

/**
 * Route for get All Workshop proposal
 */
router.get('/', async ctx =>{
    ctx.body = await getAllWorkShop();
});

/**
 * Route for get Workshop proposal of workshop presenter
 */
router.get('/:id', async ctx =>{
    const userID = ctx.params.id;
    ctx.body = await getWorkShopByUserId(userID);
});

/**
 * Route for get Workshop proposal by id
 */
router.get('/work/:id', async ctx =>{
    const id = ctx.params.id;
    ctx.body = await getWorkShopById(id);
});

/**
 * Route for update Workshop proposal
 */
router.put('/:id', verifyWorkshopConductor, async ctx =>{
    const id = ctx.params.id;
    let workShop = ctx.request.body;
    ctx.body = await updateWorkShop(id,workShop);
    ctx.body = workShop;
})

/**
 * Route for approval of Workshop proposal
 */
router.put('/approval/:id',verifyWorkshopConductor, async ctx => {
    const id = ctx.params.id;
    let workShop = ctx.request.body;
    workShop = await approvalStatus(id,workShop);
    ctx.body = workShop;
})

/**
 * Route for remove Workshop proposal
 */
router.delete('/:id',verifyWorkshopConductor, async ctx =>{
    const id = ctx.params.id;
    ctx.response.state = 204;
    ctx.body = await removeWorkShopById(id);
})

module.exports = router;