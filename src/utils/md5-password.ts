import crypto from "crypto";
// md5Password用于对用户密码进行加密
export function md5Password(password: string) {
  const md5 = crypto.createHash("md5");
  const encryptedPassword = md5.update(password).digest("hex");
  return encryptedPassword;
}
