import ResetPasswordToken from '../models/resetPasswordToken';
import {getCurrentDate} from './getCurrentDate';
import {isDueDate} from './checkDate';

export const removeExpiredResetPasswordTokens = () => {
    let currentDate = getCurrentDate();
    ResetPasswordToken.find({}, (err, tokens) => {
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