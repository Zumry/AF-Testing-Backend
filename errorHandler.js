/**
 * @author : A.M Zumry
 * Registration Number : IT19175126
 */

module.exports =async (ctx, next) => {
    try {
        await next();
    }catch(err){
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
};