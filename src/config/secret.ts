import fs from "fs";
const PRIVATE_KEY = fs.readFileSync("./src/config/keys/private.key");
const PUBLIC_KEY = fs.readFileSync("./src/config/keys/public.key");
export { PRIVATE_KEY, PUBLIC_KEY };
