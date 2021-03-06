import EmailVerificationToken from '../models/emailVerificationToken';
import {getCurrentDate} from './getCurrentDate';
import {isDueDate} from './checkDate';

export const removeExpiredEmailTokens = () => {
    let currentDate = getCurrentDate();
    EmailVerificationToken.find({}, (err, tokens) => {
        if(err) {
            throw err;
        }
        for(let token of tokens) {
            let expirationDate = token.expirationDate;
            let id = token._id;
            if(isDueDate(currentDate, expirationDate)) {
                EmailVerificationToken.findByIdAndRemove(id, (err, result) => {
                    if(err) {
                        throw err;
                    }
                });
            }
        }
    });
}