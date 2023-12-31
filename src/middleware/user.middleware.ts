import { userService } from "../service/user.service";
import { Context, Next } from "koa"; // 导入 Context,Next 类型
import type { IUser } from "../types/user";
import { md5Password } from "../utils/md5-password";

import {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS
} from "../config/error-constants";
const verifyUser = async (ctx: Context, next: Next) => {
  // 1.判断相关的数据逻辑(是否已存在/为空/格式问题等等)

  // 1.1为空判断
  const { name, password } = ctx.request.body as IUser;
  if (ctx.request.method !== "PATCH") {
    if (!name || !password) {
      return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx);
    }
  }

  // 1.2判断用户名是否已存在
  const isExistUserName = (await userService.findUserByName(name)) as IUser[];
  // 在这里处理除本名以外已存在相同用户名的情况
  if (Array.isArray(isExistUserName)) {
    if (isExistUserName.length > 1) {
      return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx);
    } else if (isExistUserName.length) {
      const userId = ctx.params.userId;
      if (isExistUserName[0].id !== Number(userId)) {
        return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx);
      }
    }
    //   只有上面的用户名登录逻辑验证通过，才能执行下一个中间件
    await next();
  }
};
const handlePassword = async (ctx: Context, next: Next) => {
  // 1.取出密码
  const { password } = ctx.request.body as IUser;
  if (!password) {
    await next();
    return;
  }
  // 2.对密码进行加密
  // ctx.request.body.password=加密（password）

  // ctx.request.body的类型是unknown，需要进行属性检测和类型断言
  if (typeof ctx.request.body === "object" && ctx.request.body !== null) {
    // 这一步非常关键，必须检测password是否在ctx.request.body中，否则会报错
    if ("password" in ctx.request.body) {
      ctx.request.body.password = md5Password(password);
    } else {
      return;
    }
  } else {
    return;
  }
  // 3.执行下一个中间件
  await next();
};
export { verifyUser, handlePassword };
