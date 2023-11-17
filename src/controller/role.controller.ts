import { Context } from "koa"; // 导入 Context 类型
import { roleService } from "../service/role.service";
import { menuType } from "../types/menu";
import { roleType } from "../types/role";
import { roleMenuType } from "../types/roleMenu";
import { NO_PERMISSION_TO_OPERATE } from "../config/error-constants";
class RoleController {
  async create(ctx: Context) {
    //   1.获取角色对象信息
    const role = ctx.request.body;
    //   2.将数据插入到数据库中
    const result = await roleService.create(role);

    // 3.返回结果
    ctx.body = {
      code: 0,
      message: "创建角色成功",
      data: result
    };
  }
  async remove(ctx: Context) {
    const { roleId } = ctx.params;
    if ([1, 2, 28].includes(Number(roleId))) {
      return ctx.app.emit("error", NO_PERMISSION_TO_OPERATE, ctx);
    }
    const result = await roleService.delete(Number(roleId));
    ctx.body = {
      message: "删除成功",
      data: result
    };
  }
  async update(ctx: Context) {
    // 1.获取用户传递过来的信息
    const role = ctx.request.body;
    const id = ctx.params.roleId;
    // 3.将user的信息存入数据库
    const result = await roleService.update(id, role);
    if ([1, 2, 28].includes(Number(id))) {
      return ctx.app.emit("error", NO_PERMISSION_TO_OPERATE, ctx);
    }
    ctx.body = {
      message: "修改成功",
      data: result
    };
  }
  async findRoleById(ctx: Context) {
    const { roleId } = ctx.params;
    const result = (await roleService.findRoleById(Number(roleId))) as roleType[];
    ctx.body = {
      data: result[0]
    };
  }
  async findRoleByName(ctx: Context) {
    const role = ctx.request.body as roleType;
    const result = (await roleService.findRoleByName(role.name)) as roleType[];
    ctx.body = {
      data: result[0]
    };
  }
  async list(ctx: Context) {
    const requestInfo = ctx.request.body as roleType;
    const result = (await roleService.list(requestInfo)) as roleType[];
    // 2.获取菜单信息
    if (Array.isArray(result) && !!result.length) {
      for (const role of result) {
        const { id } = role;
        const menu = await roleService.getRoleMenu(id);
        role.menuList = menu ?? [];
      }
    }
    ctx.body = {
      code: 0,
      message: "获取角色列表",
      data: {
        list: result,
        totalCount: result.length
      }
    };
  }
  async assignMenu(ctx: Context) {
    // 1.获取参数
    const roleId = ctx.params.roleId;
    const { menuIds } = ctx.request.body as menuType;
    // 2.分配权限
    await roleService.assignMenu(Number(roleId), menuIds);

    // 3.返回结果
    ctx.body = {
      code: 0,
      message: "分配权限成功~"
    };
  }
  async searchMenuById(ctx: Context) {
    const roleId = ctx.params.roleId;
    // 2.分配权限
    const result = (await roleService.getRoleMenu(Number(roleId))) as roleMenuType[];
    // 2.获取菜单信息
    if (Array.isArray(result) && !!result.length) {
      for (const role of result) {
        const { id } = role;
        const menu = await roleService.getRoleMenu(id);
        role.menu = menu;
      }
    }
    // 3.返回结果
    ctx.body = {
      code: 0,
      data: result,
      message: "查询成功~"
    };
  }
  async assignUser(ctx: Context) {
    // 1.获取参数
    const userId = ctx.params.userId;
    const { id } = ctx.request.body as roleType;
    // 2.分配权限
    await roleService.assignUser(Number(id), Number(userId));
    // 3.返回结果
    ctx.body = {
      code: 0,
      message: "分配权限成功~"
    };
  }
}
const roleController = new RoleController();
export { roleController };
