const nodemailer = require('nodemailer');

import {
    user,
    password
} from '../config/account';
import {url} from '../config/url';

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    auth: {
        user: user,
        pass: password
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: 'timeassembly.com', // sender address
    to: 'baz@blurdybloop.com', // list of receivers
    subject: 'Please confirm your Email account', // Subject line
    text: 'Email confirmation', // plain text body
    html: `<p>Welcome new timeAssembly user</p><br> 
    <p>Please Confirm your email address</p>
    <p>Please Click on the link to verify your email.</p>
    <br><a href="${url}">Click here to verify</a>" 
    <p>If you received this email by mistake, simply delete it.</p>` 
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        throw error;
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});