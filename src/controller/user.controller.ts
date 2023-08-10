import { Context } from "koa"; // 导入 Context 类型
import { userService } from "../service/user.service";
import type { userType } from "../service";

class UserController {
  async create(ctx: Context) {
    // 1.获取用户传递过来的信息
    const user = ctx.request.body as userType;

    // 2.判断相关的数据逻辑(是否已存在/为空/格式问题等等)

    // 2.1为空判断
    const { name, password } = user;
    if (!name || !password) {
      ctx.body = {
        code: -1001,
        message: "用户名或密码不能为空"
      };
      return;
    }
    // 2.2判断用户名是否已存在
    const isExistUserName = await userService.findUserByName(name);
    if (Array.isArray(isExistUserName) && isExistUserName.length > 0) {
      // 在这里处理已存在用户名的情况
      ctx.body = {
        code: -1002,
        message: "用户名已存在,无法注册"
      };
      return;
    }
    // 3.将user的信息存入数据库
    const result = await userService.create(user);
    // 4.查看存储的结果，需要返回创建信息给前端
    ctx.body = {
      message: "创建成功",
      data: result
    };
  }
}
const userController = new UserController();
export { userController };
