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

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/send', (req, res) => {
    const data = JSON.parse(req.body)
    const mailOptions = {
        from: req.body.name + ' <' + data.contact + '>',
        to: 'alexander.front@megapari.com',
        subject: data.subject,
        html: '<p>' + data.message + '</p>'
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
