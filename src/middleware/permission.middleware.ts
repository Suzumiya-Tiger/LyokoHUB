import { Context, Next } from "koa";
import { OPERATION_IS_NOT_PERMITTED } from "../config/error-constants";
import { permissionService } from "../service/permission.service";

const verifyMomentPermission = async (ctx: Context, next: Next) => {
  // 1.获取登录用户的id/修改动态的id
  const { momentId } = ctx.params;
  const { id } = ctx.user;
  // 2.查询user的id(user_id)是否有修改momentId的权限
  const isPermission = await permissionService.checkMoment(momentId, id);
  if (!isPermission) {
    return ctx.app.emit("error", OPERATION_IS_NOT_PERMITTED, ctx);
  }
  // 执行下一个中间件
  await next();
};
export default verifyMomentPermission;
