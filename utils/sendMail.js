const nodemailer = require('nodemailer');

import {account} from '../config/account';
import {url} from '../config/url';
import {development} from '../config/settings';

const productionTransporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    auth: {
        user: account.user,
        pass: account.password
    }
});

const devTransporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    auth: {
        user: account.user,
        pass: account.password
    },
    tls: {
        rejectUnauthorized: false
    }
});

// create reusable transporter object using the default SMTP transport
export let transporter;
if(development) {
    transporter = devTransporter; 
} else {
    transporter = productionTransporter;
}


