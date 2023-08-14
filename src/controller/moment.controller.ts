import { Context } from "koa"; // 导入 Context 类型
import type { userType } from "../types/service";
import { momentService } from "../service/moment.service";

class MomentController {
  async create(ctx: Context) {
    //   1.获取动态的内容
    const { content } = ctx.request.body as userType;
    //   2.动态由哪位用户来发布(通过token获取id/name)
    const { id } = ctx.user;
    // 3.将动态相关的数据插入到数据库
    const result = await momentService.create(content, id);
    ctx.body = {
      code: 0,
      message: "创建动态成功",
      data: result
    };
  }
}
const momentController = new MomentController();
export { momentController };
