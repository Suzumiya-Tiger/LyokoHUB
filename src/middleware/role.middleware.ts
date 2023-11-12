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
  const isExistUserName = (await roleService.findRoleByName(name)) as roleType[];

  // 在这里处理除本名以外已存在相同用户名的情况
  if (Array.isArray(isExistUserName)) {
    if (isExistUserName.length > 1) {
      return ctx.app.emit("error", ROLENAME_IS_ALREADY_EXISTS, ctx);
    } else if (isExistUserName.length) {
      if (ctx.request.method === "PATCH") {
        const roleId = ctx.params.userId;
        if (isExistUserName[0].id !== Number(roleId)) {
          return ctx.app.emit("error", ROLENAME_IS_ALREADY_EXISTS, ctx);
        }
      } else {
        return ctx.app.emit("error", ROLENAME_IS_ALREADY_EXISTS, ctx);
      }
      // 只有上面的逻辑验证通过，才能执行下一个中间件
      await next();
    }
  }
  //   只有上面的用户名登录逻辑验证通过，才能执行下一个中间件
  await next();
};
export { verifyRole };
