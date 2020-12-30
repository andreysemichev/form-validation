import dotenv from "dotenv";
dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 3000;
const SERVER_URL = process.env.SERVER_URL || "localhost";
const SERVER_PROJECT_NAME = process.env.SERVER_PROJECT_NAME || "None";

const SERVER = {
  url: SERVER_URL,
  port: SERVER_PORT,
  projectName: SERVER_PROJECT_NAME
};

const config = {
  server: SERVER
};

export default config;
