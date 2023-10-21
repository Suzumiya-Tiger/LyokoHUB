import { Context } from "koa"; // 导入 Context 类型
import { roleService } from "../service/role.service";
import { menuType } from "../types/menu";
import { roleType } from "../types/role";
import { roleMenuType } from "../types/roleMenu";
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
    ctx.body = "创建成功";
  }
  async update(ctx: Context) {
    ctx.body = "创建成功";
  }
  async list(ctx: Context) {
    // 1.获取角色基本信息
    const { offset = 0, size = 10 } = ctx.query;
    const result = (await roleService.list(Number(offset), Number(size))) as roleType[];
    // 2.获取菜单信息
    if (Array.isArray(result) && !!result.length) {
      for (const role of result) {
        const { id } = role;
        const menu = await roleService.getRoleMenu(id);
        role.menuList = menu;
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
  async detail(ctx: Context) {
    ctx.body = "该接口开发中";
  }
  async assignMenu(ctx: Context) {
    // 1.获取参数
    const roleId = ctx.params.roleId;
    const { menuIds } = ctx.request.body as menuType;
    console.log(menuIds);
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
