import { Context } from "koa"; // 导入 Context 类型
import menuService from "../service/menu.service";
import { roleService } from "../service/role.service";
import { menuType } from "../types/menu";
import { NO_PERMISSION_TO_OPERATE, MENU_IS_EXIST } from "../config/error-constants";

interface roleData {
  roleId: number;
}
class MenuController {
  async create(ctx: Context) {
    const menu = ctx.request.body as menuType;
    const searchResult = (await menuService.findMenuByName(menu.name)) as menuType[];
    if (searchResult.length) {
      return ctx.app.emit("error", MENU_IS_EXIST, ctx);
    }
    // 创建菜单
    const result = await menuService.create(menu);
    const createResult = (await menuService.findMenuByName(menu.name)) as menuType[];
    //建立角色和菜单的映射关系
    const { id } = ctx.user;
    const roles = (await roleService.findRoleByUserId(id)) as roleData[];
    await roleService.updateMenu(Number(roles[0].roleId), Number(createResult[0].id));

    ctx.body = {
      code: 0,
      message: "创建菜单成功",
      data: result
    };
  }
  async update(ctx: Context) {
    // 1.获取用户传递过来的信息
    const menu = ctx.request.body as menuType;
    const menuId = ctx.params.menuId;
    if (Number(menuId) <= 46) {
      return ctx.app.emit("error", NO_PERMISSION_TO_OPERATE, ctx);
    }
    //建立角色和菜单的映射关系
    const { id } = ctx.user;
    const roles = (await roleService.findRoleByUserId(id)) as roleData[];
    await roleService.deleteSingleMenu(Number(roles[0].roleId));
    // 3.将menu的信息存入数据库
    const result = await menuService.update(menuId, menu);
    ctx.body = {
      message: "修改成功",
      data: result
    };
  }
  async delete(ctx: Context) {
    const menuId = ctx.params.menuId;
    if (Number(menuId) <= 46) {
      return ctx.app.emit("error", NO_PERMISSION_TO_OPERATE, ctx);
    }
    const result = await menuService.delete(menuId);
    ctx.body = {
      code: 0,
      message: "删除菜单成功",
      data: result
    };
  }
  async list(ctx: Context) {
    const result = (await menuService.wholeMenu()) as menuType[];
    ctx.body = {
      code: 0,
      message: "获取完整的菜单~",
      data: {
        list: result
      }
    };
  }
  async getMenuInfo(ctx: Context) {
    const { menuId } = ctx.params;
    const result = (await menuService.findMenuById(Number(menuId))) as menuType[];
    ctx.body = {
      data: result[0]
    };
  }
}
const menuController = new MenuController();
export { menuController };
