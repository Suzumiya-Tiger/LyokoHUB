import { Context } from "koa"; // 导入 Context 类型
import menuService from "../service/menu.service";
import { menuType } from "../types/menu";
import { NO_PERMISSION_TO_OPERATE } from "../config/error-constants";

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
  async update(ctx: Context) {
    // 1.获取用户传递过来的信息
    const role = ctx.request.body;
    const id = ctx.params.menuId;
    if (Number(id) <= 46) {
      return ctx.app.emit("error", NO_PERMISSION_TO_OPERATE, ctx);
    }
    // 3.将user的信息存入数据库
    const result = await menuService.update(id, role);
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
