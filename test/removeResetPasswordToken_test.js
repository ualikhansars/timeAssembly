import {expect, should, assert} from 'chai';
import {removeExpiredResetPasswordTokens} from '../utils/removeExpiredResetPasswordTokens';
import ResetPasswordToken from '../models/resetPasswordToken';

describe ('removeExpiredEmailTokens', function() {
    var tokens; 
    beforeEach(function(done) {
        tokens = [
            new ResetPasswordToken({
                token: 'a1',
                expirationDate: '2017-01-19'
            }),
            new ResetPasswordToken({
                token: 'a2',
                expirationDate: '2016-02-03'
            }),
            new ResetPasswordToken({
                token: 'a3',
                expirationDate: '2017-01-17'
            }),
            new ResetPasswordToken({
                token: 'a4',
                expirationDate: '2020-01-05'
            }),    
            new ResetPasswordToken({
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
    removeExpiredResetPasswordTokens();
    it('token a1 should be removed', function(done) {
        ResetPasswordToken.findOne({token: 'a1'}).then(function(result) {
            assert(result === null);
        });
        done();
    });
    it('token a2 should be removed', function(done) {
        ResetPasswordToken.findOne({token: 'a2'}).then(function(result) {
            assert(result === null);
        });
        done();
    });
    it('token a3 should be removed', function(done) {
        ResetPasswordToken.findOne({token: 'a3'}).then(function(result) {
            assert(result === null);
        });
        done();
    });
    it('token a4 should be remain in database', function(done) {
        ResetPasswordToken.findOne({token: 'a4'}).then(function(result) {
            assert(result.token === 'a4');
        });
        done();
    });
    it('token a5 should be removed', function(done) {
        ResetPasswordToken.findOne({token: 'a5'}).then(function(result) {
            assert(result === null);
        });
        done();
    });
    
 });