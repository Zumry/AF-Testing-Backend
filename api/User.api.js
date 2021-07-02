const {save, getAllUsers, getById, removeById, update, findByEmailAndPassword,findPasswordByEmail} = require('../dal/User.dao');
const {getAll, findPasswordByEmailInAdmin, findByEmailAndPasswordInAdmin, getByIdInAdminColl, UpdateAdmin} = require('../dal/AdminCreateUser.dao');
const {encrypt, decrypt} = require("../EncryptionHandler");

/**
 * User Login CRUD function
 */
const LoginUser = async (email, password) => {
    const UserPassword = await findPasswordByEmail(email);
    const AdminPassword = await findPasswordByEmailInAdmin(email);

    if(UserPassword !== null && AdminPassword === null){
        const decryptPassword = decrypt(UserPassword);
        if(decryptPassword === password) {
            return await findByEmailAndPassword(email, UserPassword);
        }
        else {
            return {error: 'Invalid Password'};
        }
    }else if(UserPassword === null && AdminPassword !== null){
        const decryptPassword = decrypt(AdminPassword);
        if(decryptPassword === password) {
            return await findByEmailAndPasswordInAdmin(email, AdminPassword);
        }
        else {
            return {error: 'Invalid Password'};
        }
    }
    else{
        return {error: 'No data'};
    }
};

/**
 * Create User CRUD function
 */
const createUser = async ({fullName, email, type, password}) => {
    const hashedPassword = encrypt(password);
    const user ={
        fullName,
        email,
        type,
        password: hashedPassword
    }
    return await save(user);
}

/**
 * get all User CRUD function
 */
const getAllUser = async () => {
    const users = await getAllUsers();
    const UsersAdmin = await getAll();
    let Array = [...users,...UsersAdmin]

    return Array;
};

/**
 * get User by id CRUD function
 */
const getUserById = async (id) => {
    const User = await getById(id);
    const Admin = await getByIdInAdminColl(id);

    if(User !== null && Admin === null){
        User.password = null;
        return User;
    }
    else if(User === null && Admin !== null){
        Admin.password = null;
        return Admin;
    }
    else{
        return {error:'error'}
    }
};

/**
 * Delete User by id CRUD function
 */
const deleteUser = async (id) => {
    return await removeById(id);
};

/**
 * Update User by id CRUD function
 */
const updateUser = async (id, {email, password}) => {
    const User = await getById(id);
    const Admin = await getByIdInAdminColl(id);

    if(User !== null && Admin === null){
        if(User.email !== email && email !== undefined && password === ''){
            const user = {
                fullName:User.fullName,
                email:email,
                type:User.type,
                password:User.password
            }
            return await update(id,user);

        }else if(decrypt(User.password) !== password && email === ''){
            const hashedPassword = encrypt(password);
            const user = {
                fullName:User.fullName,
                email:User.email,
                type:User.type,
                password:hashedPassword
            }
            return await update(id,user);

        }else{
            return {msg:'error User'};
        }
    }
    else if(User === null && Admin !== null){
        if(Admin.email !== email && email !== undefined && password === ''){
            const admin = {
                fullName:Admin.fullName,
                email:email,
                type:Admin.type,
                password:Admin.password
            }
            return await UpdateAdmin(id,admin);
        }else if(decrypt(Admin.password) !== password && email === ''){
            const hashedPassword = encrypt(password);
            const admin = {
                fullName:Admin.fullName,
                email:Admin.email,
                type:Admin.type,
                password:hashedPassword
            }
            return await UpdateAdmin(id,admin);
        }else{
            return {msg:'error Admin'};
        }
    }
    else{
        return {error:'error'};
    }
};

/**
 * Password Checking CRUD function
 */
const passwordCheck = async user => {
    const UserPassword = await findPasswordByEmail(user.email);
    const AdminPassword = await findPasswordByEmailInAdmin(user.email);

    if(UserPassword !== null && AdminPassword === null){
        const decryptPassword = decrypt(UserPassword);
        if(decryptPassword === user.password) {
            return {msg: 'Can Change Password'};
        }
        else {
            return {error: 'Invalid Password'};
        }
    }else if(UserPassword === null && AdminPassword !== null){
        const decryptPassword = decrypt(AdminPassword);
        if(decryptPassword === user.password) {
            return {msg: 'Can Change Password'};
        }
        else {
            return {error: 'Invalid Password'};
        }
    }
    else{
        return {error: 'No data'};
    }
};


module.exports = {
    LoginUser,
    createUser,
    getAllUser,
    getUserById,
    deleteUser,
    updateUser,
    passwordCheck
};