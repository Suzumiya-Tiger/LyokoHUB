import { Context, Next } from "koa"; // 导入 Context,Next 类型
import type { userType } from "../types/service";
import { LABEL_IS_ALREADY_EXISTS, LABEL_IS_NOT_EXIST } from "../config/error-constants";
import { labelService } from "../service/label.service";
interface labelObjType {
  id?: number;
  name: string;
}
// I.创建标签用
const verifyCreateLabel = async (ctx: Context, next: Next) => {
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
  await next();
};
// II.为动态添加标签用
const verifyLabel = async (ctx: Context, next: Next) => {
  // 1.判断相关的数据逻辑(是否已存在/为空/格式问题等等)

  const { labels } = ctx.request.body as userType;
  // 1.2检查标签是否存在
  const newLabels = [];
  for (const name of labels) {
    const isExist = await labelService.checkLabelExist(name);
    const labelObj: labelObjType = { name };
    //对label数组进行插入操作
    if (isExist && Array.isArray(isExist) && isExist.length > 0) {
      // 在这里处理已存在用户名的情况
      return ctx.app.emit("arrayError", [LABEL_IS_ALREADY_EXISTS, name], ctx);
    } else {
      // 依次创建新标签
      const insertResult = await labelService.create(name);
      // 无奈的ts类型检测...
      if ("insertId" in insertResult && typeof insertResult.insertId === "number") {
        labelObj.id = insertResult.insertId;
      }
    }
    newLabels.push(labelObj);
  }
  // 将新标签数组赋值给ctx.labels
  ctx.labels = newLabels;
  // 3.所有的labels的数据格式均为：[{id:1,name:"xxx"},{id:2,name:"xxx"}]
  //   只有上面的用户名登录逻辑验证通过，才能执行下一个中间件
  await next();
};

export { verifyCreateLabel, verifyLabel };
