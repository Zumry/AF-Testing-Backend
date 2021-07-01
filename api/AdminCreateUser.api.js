const {SaveUser} = require('../dal/AdminCreateUser.dao');
const {encrypt} = require("../EncryptionHandler");

const adminCreateUser = async ({fullName, email, type, password}) => {
    const hashedPassword = encrypt(password);
    const user = {
        fullName,
        email,
        type,
        password: hashedPassword
    }
    return await SaveUser(user);
};

module.exports = {
    adminCreateUser
};