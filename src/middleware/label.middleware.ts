import { Context, Next } from "koa"; // 导入 Context,Next 类型
import type { userType } from "../types/service";
import { LABEL_IS_ALREADY_EXISTS, LABEL_IS_NOT_EXIST } from "../config/error-constants";
import { labelService } from "../service/label.service";
const verifyLabel = async (ctx: Context, next: Next) => {
  // 1.判断相关的数据逻辑(是否已存在/为空/格式问题等等)

  // 1.1为空判断
  const { name } = ctx.request.body as userType;
  if (!name) {
    return ctx.app.emit("error", LABEL_IS_NOT_EXIST, ctx);
  }
  // 1.2检查标签是否存在
  const isExist = await labelService.checkLabelExist(name);
  if (Array.isArray(isExist) && isExist.length > 0) {
    // 在这里处理已存在用户名的情况
    return ctx.app.emit("error", LABEL_IS_ALREADY_EXISTS, ctx);
  }
  //   只有上面的用户名登录逻辑验证通过，才能执行下一个中间件
  await next();
};

export { verifyLabel };
