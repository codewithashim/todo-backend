/* eslint-disable no-undef */
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.MONGO_URI,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,
  domain: process.env.DOMAIN,
  smtp_mail: process.env.SMTP_MAIL_TO,
  smtp_password: process.env.SMTP_PASS,
  paypal_client_id :process.env.PAYPAL_CLIENT_ID,
  paypal_client_secret: process.env.PAYPAL_CLIENT_SECRET, 

  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.JWT_EXPIRATION_TIME,
    refresh_expires: process.env.JWT_REFRESH_EXPIRATION_TIME,
  },
};
