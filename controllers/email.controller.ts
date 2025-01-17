import { Router, Request, Response } from 'express';

const router: Router = Router();
const emailJs = require('emailjs');
const fs = require('fs');
const email = 'casapetrirosiamontana@gmail.com';

router.post('/test', function (req, res) {
  return res.json({success: true, msg: "test"});
});

router.post('/send', function (req, res) {
  let emailBody = '<html>';
  const clientEmail = req.body['email'];
  for (const key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      const value = req.body[key];
      if (value !== '') {
        emailBody += '<b>' + key + '</b>: ' + value + ' <br> ';
      }
    }
  }
  emailBody += '</html>';
  // write data to local file in case that email fails
  fs.appendFile('./dist/browser/assets/log/send_mail.log',
    new Date().toISOString() + ': ' + emailBody + '\n',
    function (err) {
      if (err) {
        return console.log(err);
      }
      console.log('The file was saved!');
    });
  // send data via email

  emailJs.server
    .connect({
      user: email,
      password: '099asincron',
      host: 'smtp.gmail.com',
      ssl: true,
    })
    .send({
      from: email,
      to: email,
      subject: 'casaPetriRosiaMontana.ro' + req.body['pageUrl'],
      'reply-to': clientEmail,
    attachment:
        [{data: emailBody, alternative: true}]
    }, function (err, message) {
      if (err) {
        console.log(err || message);
        return res.json({success: false, msg: message});
      } else {
        console.log('email sent ' + clientEmail || message);
        return res.json({success: true, msg: message});
      }
    });
});

export const EmailController: Router = router;
