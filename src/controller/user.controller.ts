import { Context } from "koa"; // 导入 Context 类型
import { userService } from "../service/user.service";
import type { userType } from "../service";

class UserController {
  async create(ctx: Context) {
    // 1.获取用户传递过来的信息
    const user = ctx.request.body as userType;

    // 1.2.判断相关的数据逻辑(是否存在/格式问题等等)

    // 2.将user的信息存入数据库
    const result = await userService.create(user);
    // 3.查看存储的结果，需要返回创建信息给前端
    ctx.body = {
      message: "创建成功",
      data: result
    };
  }
}
const userController = new UserController();
export { userController };
