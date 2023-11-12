import departmentService from "../service/department.service";
import { Context, Next } from "koa"; // 导入 Context,Next 类型
import { NAME_IS_REQUIRED, NAME_IS_ALREADY_EXISTS } from "../config/error-constants";
import { departmentType } from "../types/department";

const verifyDepartment = async (ctx: Context, next: Next) => {
  // 1.判断相关的数据逻辑(是否已存在/为空/格式问题等等)

  // 1.1为空判断
  const { name } = ctx.request.body as departmentType;
  if (!name) {
    return ctx.app.emit("error", NAME_IS_REQUIRED, ctx);
  }

  // 1.2判断角色名是否已存在

  const isExistUserName = (await departmentService.findDepartmentByName(
    name
  )) as departmentType[];
  console.log(isExistUserName);
  // 在这里处理除本名以外已存在相同用户名的情况
  if (Array.isArray(isExistUserName)) {
    if (isExistUserName.length > 1) {
      return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx);
    } else if (isExistUserName.length) {
      if (ctx.request.method === "PATCH") {
        const departmentId = ctx.params.departmentId;
        if (isExistUserName[0].id !== Number(departmentId)) {
          return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx);
        }
      } else {
        return ctx.app.emit("error", NAME_IS_ALREADY_EXISTS, ctx);
      }
    }
    // 只有上面的逻辑验证通过，才能执行下一个中间件
    await next();
  }
};
export { verifyDepartment };
