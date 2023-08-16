import {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UN_AUTHORIZATION
} from "../config/error-constants";
import jwt from "jsonwebtoken";
import { Context, Next } from "koa"; // 导入 Context,Next 类型
import type { userType } from "../types/service";
import { userService } from "../service/user.service";
import { md5Password } from "../utils/md5-password";
import type { IUser } from "../types/user";
import { PUBLIC_KEY } from "../config/secret";
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
  if (!user) {
    return ctx.app.emit("error", NAME_IS_NOT_EXISTS, ctx);
  }
  // 2.查询数据库中的用户密码和用户传递的密码是否一致
  if (user.password !== md5Password(password)) {
    return ctx.app.emit("error", PASSWORD_IS_INCORRENT, ctx);
  }
  // 3.将user信息存入ctx中
  ctx.user = user;
  // 4.验证通过，执行next进入令牌颁发中间件
  // 下一个中间件的职能：颁发令牌，传入token=> 在login.controller.ts中进行验证
  await next();
};
// //verfityAuth用于验证token的有效性
const verifyAuth = async (ctx: Context, next: Next) => {
  // 1.获取用户传递的token
  const authorization = ctx.headers.authorization;
  // "Bearer "=>切记！！！！！！！这里的Bearer后面有一个空格！！！！！！！
  if (!authorization) {
    return ctx.app.emit("error", UN_AUTHORIZATION, ctx);
  }
  const token = authorization.replace("Bearer ", "");
  // 2.验证token是否有效
  try {
    // 2.1获取token的信息
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    });
    // 2.2将token中被解析出来的用户信息存入ctx中
    ctx.user = result;
    // 3.执行next进入下一个中间件
    await next();
  } catch (error) {
    ctx.app.emit("error", UN_AUTHORIZATION, ctx);
  }
};
export { verifyLogin, verifyAuth };
