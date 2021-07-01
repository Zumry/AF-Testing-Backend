const jwt = require('jsonwebtoken');
const {LoginUser, getUserById} = require("./api/User.api");
const dotenv = require('dotenv');
dotenv.config();

/**
 * @author : A.M Zumry
 * Registration Number : IT19175126
 */

const verifyReviewer = async (ctx, next) =>{
    if (!ctx.headers.authorization) ctx.throw(403, 'No token.');
    const token = ctx.headers.authorization.split(' ')[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const User = await getUserById(payload.sub);

    if(User.error === 'error'){
        let err = new Error('Invalid Data!')
        err.status = 404
        return next(err)
    }

    if(User.type !== 'Reviewer'){
        let errorMessage = 'You are not authorized to perform this operation!'
        const statusCode = 403
        ctx.throw(statusCode,errorMessage)
    }

    await next();
}

const verifyResearcher = async (ctx, next) =>{
    if (!ctx.headers.authorization) ctx.throw(403, 'No token.');
    const token = ctx.headers.authorization.split(' ')[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const User = await getUserById(payload.sub);

    if(User.error === 'error'){
        let err = new Error('Invalid Data!')
        err.status = 404
        return next(err)
    }

    if(User.type !== 'Researcher'){
        let errorMessage = 'You are not authorized to perform this operation!'
        const statusCode = 403
        ctx.throw(statusCode,errorMessage)
    }

    await next();
}

const verifyWorkshopConductor = async (ctx, next) =>{
    if (!ctx.headers.authorization) ctx.throw(403, 'No token.');
    const token = ctx.headers.authorization.split(' ')[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const User = await getUserById(payload.sub);

    if(User.error === 'error'){
        let err = new Error('Invalid Data!')
        err.status = 404
        return next(err)
    }

    if(User.type !== 'WorkshopConductor'){
        let errorMessage = 'You are not authorized to perform this operation!'
        const statusCode = 403
        ctx.throw(statusCode,errorMessage)
    }

    await next();
}

const verifyEditor = async (ctx, next) =>{
    if (!ctx.headers.authorization) ctx.throw(403, 'No token.');
    const token = ctx.headers.authorization.split(' ')[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const User = await getUserById(payload.sub);

    if(User.error === 'error'){
        let err = new Error('Invalid Data!')
        err.status = 404
        return next(err)
    }

    if(User.type !== 'Editor'){
        let errorMessage = 'You are not authorized to perform this operation!'
        const statusCode = 403
        ctx.throw(statusCode,errorMessage)
    }

    await next();
}

const verifyAdmin = async (ctx, next) =>{
    if (!ctx.headers.authorization) ctx.throw(403, 'No token.');
    const token = ctx.headers.authorization.split(' ')[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const User = await getUserById(payload.sub);

    if(User.error === 'error'){
        let err = new Error('Invalid Data!')
        err.status = 404
        return next(err)
    }

    if(User.type !== 'Editor'){
        let errorMessage = 'You are not authorized to perform this operation!'
        const statusCode = 403
        ctx.throw(statusCode,errorMessage)
    }

    await next();
}

const verifyAttendees = async (ctx, next) =>{
    if (!ctx.headers.authorization) ctx.throw(403, 'No token.');
    const token = ctx.headers.authorization.split(' ')[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const User = await getUserById(payload.sub);

    if(User.error === 'error'){
        let err = new Error('Invalid Data!')
        err.status = 404
        return next(err)
    }

    if(User.type !== 'Attendee'){
        let errorMessage = 'You are not authorized to perform this operation!'
        const statusCode = 403
        ctx.throw(statusCode,errorMessage)
    }

    await next();
}

const getToken = async (user) => {
    const User = await LoginUser(user.email, user.password);

    if(User !== null && User.error !== 'Invalid Password' && User.error !== 'No data'){
        const payload = {sub: User._id};
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: 3600});

        return {token:token,userID:User._id,type:User.type};
    }
    else {
        return {error:"User can not access."};
    }

};

module.exports = {
    getToken,
    verifyReviewer,
    verifyResearcher,
    verifyWorkshopConductor,
    verifyEditor,
    verifyAdmin,
    verifyAttendees
}






