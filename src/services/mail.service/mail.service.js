const nodemailer = require('nodemailer');

const {
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_USER,
  MODE,
  BACKEND_APP_URL = 'https://lifehacker-rss-parser-server.herokuapp.com',
} = require('../../config/config');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, verificationToken) {
    const URL = MODE === 'production' ? BACKEND_APP_URL : 'http://localhost:4000';
    const res = await this.transporter.sendMail({
      from: SMTP_USER,
      to,
      subject: 'Please confirm your registration!',
      text: '',
      html: `<p>Please, <b>confirm you registration</b> by visiting <a href="${URL}/api/auth/verify/${verificationToken}" target="_blank">this link</a></p> `,
    });

    return res;
  }
}

const mailService = new MailService();

module.exports = { mailService };
