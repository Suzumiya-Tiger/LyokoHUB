import { Context } from "koa"; // 导入 Context 类型
import { userType } from "../types/service";
import { labelService } from "../service/label.service";
class LabelController {
  async create(ctx: Context) {
    // 1.获取标签名称
    const { name } = ctx.request.body as userType;
    console.log(name);

    // 2.操作数据库存储name
    const result = await labelService.create(name);

    // 3.返回结果
    ctx.body = {
      code: 0,
      message: "创建标签成功",
      data: result
    };
  }
}
const labelController = new LabelController();
export { labelController };
