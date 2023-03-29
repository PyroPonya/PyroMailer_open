const nodemailer = require('nodemailer');
const express = require('express');
const favicon = require('express-favicon');
const app = express();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alexander.front@megapari.com',
        pass: 'QWE!@#qwe123'
    }
});

app.use(favicon(__dirname + '/assets/favicon.ico'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/send', (req, res) => {
    const company_chaeck = req.body.company !== '' ? 'Presenting: ' + req.body.company + '<br>' : ''
    const mailOptions = {
        from: req.body.name + ' <' + req.body.contact + '>',
        to: 'alexander.front@megapari.com',
        subject: req.body.subject,
        html: 
        '<p>Message from: ' + 
        req.body.name 
        +'(' + 
        req.body.contact
         + ')' + '</p>' + '<br>' + 
        company_chaeck
         + '<br>' + 
         '<p>' + 
         req.body.message 
         + '</p>' + 
         '<h5 style="width: 98%; text-align: right;"> delivered with ❤️ by PyroMailer</h5>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Success');
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
