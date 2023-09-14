import dotenv from "dotenv";
dotenv.config();
const SERVER_PORT = process.env.SERVER_PORT || 8000;
const SERVER_HOST = process.env.SERVER_HOST;
const MYSQL_HOST: string = process.env.MYSQL_HOST;
const MYSQL_DATABASE: string = process.env.MYSQL_DATABASE;
const MYSQL_USER: string = process.env.MYSQL_USER;
const MYSQL_PORT: number = Number(process.env.MYSQL_PORT);
const MYSQL_PASSWORD: string = process.env.MYSQL_PASSWORD;
export {
  SERVER_PORT,
  SERVER_HOST,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD
};
