import {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT
} from "../config/error-constants";
import { Context, Next } from "koa"; // 导入 Context,Next 类型
import type { userType } from "../types/service";
import { userService } from "../service/user.service";
import { md5Password } from "../utils/md5-password";
import type { IUser } from "../types/user";
const verifyLogin = async (ctx: Context, next: Next) => {
  const { name, password } = ctx.request.body as userType;
  // 1.判断相关的数据逻辑(是否已存在/为空/格式问题等等)
  // 1.1判断用户名和密码是否为空
  if (!name || !password) {
    //   记得把ctx传递出去
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }
  // 1.2判断用户名是否已存在
  let user: IUser | null = null;
  const users = await userService.findUserByName(name);
  if (Array.isArray(users) && users.length > 0) {
    user = users[0] as IUser;
  }
  console.log(user);
  if (!user) {
    return ctx.app.emit("error", NAME_IS_NOT_EXISTS, ctx);
  }
  // 2.查询数据库中的用户密码和用户传递的密码是否一致
  if (user.password !== md5Password(password)) {
    return ctx.app.emit("error", PASSWORD_IS_INCORRENT, ctx);
  }
  // 3.将user信息存入ctx中
  ctx.user = user;
  // 4.颁发令牌，传入token

  // 5.验证通过，执行next进入令牌颁发中间件
  await next();
};

export { verifyLogin };
