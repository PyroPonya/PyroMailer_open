const nodemailer = require('nodemailer');
const express = require('express');
const app = express();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alexander.front@megapari.com',
        pass: 'QWE!@#qwe123'
    }
});

app.use('/pyromailer_logo.ico', express.static('assets/pyromailer_logo.ico'));
app.use(express.static("assets"));
app.use(express.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/send', (req, res) => {
    const mailOptions = {
        from: req.body.name + ' <' + req.body.contact + '>',
        to: 'alexander.front@megapari.com',
        subject: req.body.subject,
        html: '<p>' + req.body.message + '</p>' + '<h3>' + req.body + '</h3>' + '<h3>' + req + '</h3>'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error');
        } else {
            console.log('Email sent: ' + info.response);
            console.log('mailOptions: ' + mailOptions);
            res.send('Success');
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
