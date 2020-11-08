const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.GMAIL_OAUTH_CLIENT_ID, // ClientID
    process.env.GMAIL_OAUTH_CLIENT_SECRET, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN
  });
  const accessToken = oauth2Client.getAccessToken()

  const sendEmail = async (options) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
  
            type: "OAuth2",
            user: "mahekkhowala@gmail.com", 
            clientId: process.env.GMAIL_OAUTH_CLIENT_ID,
            clientSecret: process.env.GMAIL_OAUTH_CLIENT_SECRET,
            refreshToken: process.env.GMAIL_REFRESH_TOKEN,
            accessToken: accessToken
    },
    tls: {
        rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
let info = transporter.sendMail({
    from: `${process.env.FROM_EMAIL_NAME} <${process.env.FROM_EMAIL_ID}>`, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message // plain text body
  });

  console.log("Message sent: %s", info.messageId);
};

module.exports = sendEmail;