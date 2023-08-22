import dotenv from "dotenv";
dotenv.config();
const SERVER_PORT = process.env.SERVER_PORT || 8000;
const SERVER_HOST = process.env.SERVER_HOST;
export { SERVER_PORT, SERVER_HOST };
