import crypto from "crypto";

export function md5Password(password: string) {
  const md5 = crypto.createHash("md5");
  const encryptedPassword = md5.update(password).digest("hex");
  return encryptedPassword;
}
