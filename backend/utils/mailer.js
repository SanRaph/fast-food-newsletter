// utils/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendNewsletter = async (to, subject, html) => {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html
  });
};