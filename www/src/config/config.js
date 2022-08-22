const dotenv = require('dotenv');
dotenv.config();

const {
  PORT,
  MODE,
  DB_URL,
  DB_NAME,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  ACCESS_EXPIRES_IN,
  REFRESH_EXPIRES_IN,
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_USER,
  RSS_NODE_SCHEDULE,
  FRONTEND_APP_URL,
} = process.env;

const ALLOWED_DOMAINS = ['http://localhost:3000', 'http://localhost:4000', 'http://www.google.com'];

module.exports = {
  ALLOWED_DOMAINS,
  PORT,
  MODE,
  DB_URL,
  DB_NAME,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  ACCESS_EXPIRES_IN,
  REFRESH_EXPIRES_IN,
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_USER,
  RSS_NODE_SCHEDULE,
  FRONTEND_APP_URL,
};