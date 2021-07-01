const crypto = require("crypto");

/**
 * @author : A.M Zumry
 * Registration Number : IT19175126
 */

/**
 * This function is to encrypt the password
 */
const encrypt = (password) => {
    // Creates 16 byte iv, buffer
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(process.env.ENCRYPTION_KEY), iv);

    const encryptedPassword = Buffer.concat([
        cipher.update(password),
        cipher.final(),
    ]);

    return iv.toString('hex') + ':' + encryptedPassword.toString("hex");
};

/**
 * This function is to decrypt the password
 */
const decrypt = (encryption) => {
    const encryptionParts = encryption.split(':');
    const iv = Buffer.from(encryptionParts.shift(),'hex');
    const encryptedText = Buffer.from(encryptionParts.join(':'), 'hex');

    const decipher = crypto.createDecipheriv("aes-256-ctr", Buffer.from(process.env.ENCRYPTION_KEY),iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
};

module.exports = { encrypt, decrypt };