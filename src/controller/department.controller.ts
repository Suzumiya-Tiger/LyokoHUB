import { Context } from "koa"; // 导入 Context 类型
import departmentService from "../service/department.service";
import { departmentType } from "../types/department";
import { NO_PERMISSION_TO_OPERATE } from "../config/error-constants";

import type { totalType } from "../types/totalList";

class DepartmentController {
  async create(ctx: Context) {
    const department = ctx.request.body;
    const result = await departmentService.create(department);

    // 3.返回结果
    ctx.body = {
      code: 0,
      message: "创建部门成功",
      data: result
    };
  }
  async delete(ctx: Context) {
    const departmentId = ctx.params.departmentId;
    if (Number(departmentId) <= 2) {
      return ctx.app.emit("error", NO_PERMISSION_TO_OPERATE, ctx);
    }
    const result = await departmentService.delete(departmentId);
    ctx.body = {
      code: 0,
      message: "删除部门成功",
      data: result
    };
  }
  async update(ctx: Context) {
    const departmentId = ctx.params.departmentId;
    if (Number(departmentId) <= 2) {
      return ctx.app.emit("error", NO_PERMISSION_TO_OPERATE, ctx);
    }
    const department = ctx.request.body as departmentType;
    const result = await departmentService.updateDepartment(department, departmentId);
    ctx.body = {
      code: 0,
      message: "更新部门成功",
      data: result
    };
  }
  async getwholeDepartmentInfo(ctx: Context) {
    const result = (await departmentService.getwholeDepartmentInfo()) as departmentType[];
    const [total] = (await departmentService.getMenuTotalCount()) as totalType[];

    ctx.body = {
      code: 0,
      message: "查询成功",
      data: {
        list: result,
        totalCount: total.totalCount
      }
    };
  }
  async getDepartmentInfo(ctx: Context) {
    const departmentId = ctx.params.departmentId;
    const result = await departmentService.getDepartmentInfo(departmentId);
    ctx.body = {
      code: 0,
      message: "查询成功",
      data: result
    };
  }
}
const departmentController = new DepartmentController();
export { departmentController };
