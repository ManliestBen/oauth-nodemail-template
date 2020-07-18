var passport = require('passport');
const nodemailer = require('nodemailer');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user');
var access = '';
var refresh = '';
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ 'googleId': profile.id }, function(err, user) {
      if (err) return cb(err);
      if (user) {
        // Enable for testing:
        // sendMail();
        return cb(null, user);
      } else {
        var newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        newUser.save(function(err) {
          if (err) return cb(err);
          return cb(null, newUser);
        });
      }
    });
  }
));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
// Enable for testing:

// function sendMail(){
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//         user: "benjamintmanley@gmail.com",
//         pass: process.env.GOOGLE_APP_PASSWORD
//     }
//   });

//   transporter.sendMail({
//       from: 'benjamintmanley@gmail.com',
//       to: 'benjamintmanley@gmail.com',
//       subject: 'Message',
//       text: 'I hope this message gets through!',
      
//   });

// }