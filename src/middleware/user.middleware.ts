import { userService } from "../service/user.service";
import { Context, Next } from "koa"; // 导入 Context,Next 类型
import type { userType } from "../types/service";
import { md5Password } from "../utils/md5-password";

import {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS
} from "../config/error-constants";
const verifyUser = async (ctx: Context, next: Next) => {
  // 1.判断相关的数据逻辑(是否已存在/为空/格式问题等等)

  // 1.1为空判断
  const { name, password } = ctx.request.body as userType;
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
  }
  // 1.2判断用户名是否已存在
  const isExistUserName = await userService.findUserByName(name);
  if (Array.isArray(isExistUserName) && isExistUserName.length > 0) {
    // 在这里处理已存在用户名的情况
    return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx);
  }
  //   只有上面的用户名登录逻辑验证通过，才能执行下一个中间件
  await next();
};
const handlePassword = async (ctx: Context, next: Next) => {
  // 1.取出密码
  const { password } = ctx.request.body as userType;
  // 2.对密码进行加密
  // ctx.request.body.password=加密（password）

  // ctx.request.body的类型是unknown，需要进行属性检测和类型断言
  if (typeof ctx.request.body === "object" && ctx.request.body !== null) {
    // 这一步非常关键，必须检测password是否在ctx.request.body中，否则会报错
    if ("password" in ctx.request.body) {
      ctx.request.body.password = md5Password(password);
    }
  }
  // 3.执行下一个中间件
  await next();
};
export { verifyUser, handlePassword };
