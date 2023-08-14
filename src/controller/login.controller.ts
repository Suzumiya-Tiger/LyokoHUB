import { Context } from "koa"; // 导入 Context 类型
import jwt from "jsonwebtoken";
import { PRIVATE_KEY } from "../config/secret";
// 该文件用于在登录验证均通过时，颁发令牌
class LoginController {
  // 签发令牌,传入token
  sign(ctx: Context) {
    try {
      // 1.获取用户信息
      const { id, name } = ctx.user;
      // 2.颁发token令牌
      const token = jwt.sign({ id, name }, PRIVATE_KEY, {
        // 令牌有效期为24小时
        expiresIn: 24 * 60 * 60,
        algorithm: "RS256"
      });
      // 3.返回用户信息
      ctx.body = { code: 0, data: { id, name, token } };
    } catch (err) {
      console.log(err);
    }
  }
  test(ctx: Context) {
    ctx.body = "验证身份通过！";
  }
}
const loginController = new LoginController();
export { loginController };
