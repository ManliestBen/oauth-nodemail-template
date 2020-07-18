const nodemailer = require('nodemailer');

module.exports = {
    sendTestMail
}

function sendTestMail(req, res) {
    sendMail("Message here", "Text here");
    res.redirect('/')
}

function sendMail(message, text){
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: "benjamintmanley@gmail.com",
          pass: process.env.GOOGLE_APP_PASSWORD
      }
    });
  
    transporter.sendMail({
        from: 'benjamintmanley@gmail.com',
        to: 'benjamintmanley@gmail.com',
        subject: `${message}`,
        text: `${text}`,
        
    });
  
  }