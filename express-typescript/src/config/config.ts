import dotenv from 'dotenv';
dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const SERVER_URL = process.env.SERVER_URL || 'localhost';

const SERVER = {
  url: SERVER_URL,
  port: SERVER_PORT
};

const config = {
  server: SERVER
};

export default config;
