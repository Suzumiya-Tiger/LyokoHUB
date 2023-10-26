import { roleService } from "../service/role.service";
import { Context, Next } from "koa"; // 导入 Context,Next 类型
import type { roleType } from "../types/role";
import {
  ROLENAME_IS_ALREADY_EXISTS,
  ROLENAME_IS_REQUIRED
} from "../config/error-constants";
const verifyRole = async (ctx: Context, next: Next) => {
  // 1.判断相关的数据逻辑(是否已存在/为空/格式问题等等)

  // 1.1为空判断
  const { name } = ctx.request.body as roleType;
  if (!name) {
    return ctx.app.emit("error", ROLENAME_IS_REQUIRED, ctx);
  }

  // 1.2判断角色名是否已存在
  if (ctx.request.method !== "PATCH") {
    const isExistUserName = await roleService.findRoleByName(name);

    if (Array.isArray(isExistUserName) && isExistUserName.length > 0) {
      // 在这里处理已存在用户名的情况
      return ctx.app.emit("error", ROLENAME_IS_ALREADY_EXISTS, ctx);
    }
  }
  //   只有上面的用户名登录逻辑验证通过，才能执行下一个中间件
  await next();
};
export { verifyRole };
