const crypto = require('crypto');
import {generateExpirationDate} from '../utils/generateExpirationDate';

export const generateEmailToken = () => {
    let token = crypto.randomBytes(48).toString('hex');
    return {
        token: token,
        expirationDate: generateExpirationDate()
    }
}