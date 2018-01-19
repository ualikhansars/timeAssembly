import {expect, should, assert} from 'chai';
import {removeExpiredEmailTokens} from '../utils/removeExpiredEmailTokens';
import EmailVerificationToken from '../models/emailVerificationToken';

describe ('removeExpiredEmailTokens', function() {
    var tokens; 
    beforeEach(function(done) {
        tokens = [
            new EmailVerificationToken({
                token: 'a1',
                expirationDate: '2017-01-19'
            }),
            new EmailVerificationToken({
                token: 'a2',
                expirationDate: '2018-02-03'
            }),
            new EmailVerificationToken({
                token: 'a3',
                expirationDate: '2018-01-17'
            }),
            new EmailVerificationToken({
                token: 'a4',
                expirationDate: '2018-01-05'
            }),    
            new EmailVerificationToken({
                token: 'a5',
                expirationDate: '2018-01-19'
            }),              
          ]
 
        let i = 0;
        while(i < tokens.length) {
        tokens[i].save();
        i++;
        } 
        done();
    });
    removeExpiredEmailTokens();
    it('token a1 should be removed', function(done) {
        EmailVerificationToken.findOne({token: 'a1'}).then(function(result) {
            assert(result === null);
        });
        done();
    });
    it('token a2 should in the database', function(done) {
        EmailVerificationToken.findOne({token: 'a2'}).then(function(result) {
            assert(result.token === 'a2');
        });
        done();
    });
    it('token a3 should be removed', function(done) {
        EmailVerificationToken.findOne({token: 'a3'}).then(function(result) {
            assert(result === null);
        });
        done();
    });
    it('token a4 should be removed', function(done) {
        EmailVerificationToken.findOne({token: 'a4'}).then(function(result) {
            assert(result === null);
        });
        done();
    });
    it('token a5 should be remain in database', function(done) {
        EmailVerificationToken.findOne({token: 'a5'}).then(function(result) {
            assert(result.token === 'a5');
        });
        done();
    });
    
 });