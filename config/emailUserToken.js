const crypto = require('crypto');

export const generateEmailToken = () => {
    let token = crypto.randomBytes(48).toString('hex');
    return token
}