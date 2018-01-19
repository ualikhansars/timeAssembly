import EmailVerificationToken from '../models/emailVerificationToken';
import {getCurrentDate} from './getCurrentDate';
import {isDueDate} from './checkDate';
import { error } from 'util';

export const removeExpiredEmailTokens = () => {
    let currentDate = getCurrentDate();
    EmailVerificationToken.find({}, (err, tokens) => {
        if(err) {
            throw error;
        }
        for(let token of tokens) {
            let expirationDate = token.expirationDate;
            let id = token._id;
            if(isDueDate(currentDate, expirationDate)) {
                EmailVerificationToken.findByIdAndRemove(id, (err, result) => {
                    if(err) {
                        throw error;
                    }
                });
            }
        }
    });
}