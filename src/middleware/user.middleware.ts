import { userService } from "../service/user.service";
import { Context, Next } from "koa"; // 导入 Context,Next 类型
import type { userType } from "../service";
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

export { verifyUser };
