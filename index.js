const nodemailer = require('nodemailer');
const express = require('express');
const favicon = require('express-favicon');
const app = express();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '_set_your_login_here_',
        pass: '_set_your_password_here_'
    }
});
const email_reciver = '_set_target_email_here_';

app.use(favicon(__dirname + '/assets/favicon.ico'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/send', (req, res) => {
    const company_name = req.body.company !== '' ? '<br>' + 'Presenting: ' + req.body.company + '<br>' : '';
    const target_email = req.body.tEmail !== '' ? req.body.tEmail : email_reciver;
    const mailOptions = {
        from: req.body.name + ' <' + req.body.contact + '>',
        to: target_email,
        subject: req.body.subject,
        html: 
        '<p>Message from: ' + 
        req.body.name 
        +'(' + 
        req.body.contact
        + ')' + 
        company_name 
        + '</p>' + '<br>' + '<p>' + 
        req.body.message 
        + '</p>' + 
        '<h5 style="width: 98%; text-align: right;"> delivered with ❤️ by PyroMailer</h5>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error: ' + error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Success');
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
