import dotenv from "dotenv";
dotenv.config();
const SERVER_PORT = process.env.SERVER_PORT || 8000;
export { SERVER_PORT };
