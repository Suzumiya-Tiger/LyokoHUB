import { Context } from "koa"; // 导入 Context 类型
import menuService from "../service/menu.service";

class MenuController {
  async create(ctx: Context) {
    const menu = ctx.request.body;
    const result = await menuService.create(menu);
    ctx.body = {
      code: 0,
      message: "创建菜单成功",
      data: result
    };
  }
  async delete(ctx: Context) {
    const menuId = ctx.params.menuId;
    const result = await menuService.delete(menuId);
    ctx.body = {
      code: 0,
      message: "删除菜单成功",
      data: result
    };
  }
  async list(ctx: Context) {
    const result = await menuService.wholeMenu();
    ctx.body = {
      code: 0,
      message: "获取完整的菜单~",
      data: result
    };
  }
  async userMenuList(ctx: Context) {
    const result = await menuService.userMenu();
    ctx.body = {
      code: 0,
      message: "获取指定用户的菜单",
      data: result
    };
  }
}
const menuController = new MenuController();
export { menuController };
