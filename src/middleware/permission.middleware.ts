import { Context, Next } from "koa";
import { OPERATION_IS_NOT_PERMITTED, DATA_IS_NOT_EXIST } from "../config/error-constants";
import { permissionService } from "../service/permission.service";
// 验证权限方法的第一种多种表适配方法
/* const verifyPermission = function (resource) {
  return async (ctx: Context, next: Next) => {
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
}; */
// 验证权限方法另外一种多种表适配方法
const verifyPermission = async (ctx: Context, next: Next) => {
  // 1.获取登录用户的id/修改动态的id
  const { id } = ctx.user;
  // 2.获取资源的name/id
  // 根据ctx.params的key来获取对应的资源名称，从而定向到具体的资源(表)
  const keyName = Object.keys(ctx.params)[0];
  // params:{momentId:4}  =>抓住momentId上的moment
  // keyName=>momentId
  const resourceId = ctx.params[keyName];
  const resourceName = keyName.replace("Id", "");
  // 查询当前数据表是否存在该条数据
  const isExist = await permissionService.checkExist(resourceName, resourceId);
  if (!isExist) {
    return ctx.app.emit("error", DATA_IS_NOT_EXIST, ctx);
  }
  // 2.查询user的id(user_id)是否有修改momentId的权限
  const isPermission = await permissionService.checkResource(
    resourceName,
    resourceId,
    id
  );
  if (!isPermission) {
    return ctx.app.emit("error", OPERATION_IS_NOT_PERMITTED, ctx);
  }
  // 执行下一个中间件
  await next();
};
export default verifyPermission;
