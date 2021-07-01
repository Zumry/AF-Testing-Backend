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
            let err = new Error('You are not authorized to perform this operation!')
            err.status = 403
            return next(err)
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
        let err = new Error('You are not authorized to perform this operation!')
        err.status = 403
        return next(err)
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
        let err = new Error('You are not authorized to perform this operation!')
        err.status = 403
        return next(err)
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
        let err = new Error('You are not authorized to perform this operation!')
        err.status = 403
        return next(err)
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
        let err = new Error('You are not authorized to perform this operation!')
        err.status = 403
        return next(err)
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
        let err = new Error('You are not authorized to perform this operation!')
        err.status = 403
        return next(err)
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






