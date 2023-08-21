import { Context } from "koa"; // 导入 Context 类型
import { userService } from "../service/user.service";
import type { userType } from "../types/service";
import { fileService } from "../service/file.service";
import { IUpload } from "../types/upload";
import fs from "fs";
import { UPLOAD_PATH } from "../config/path";
class UserController {
  async create(ctx: Context) {
    // 1.获取用户传递过来的信息
    const user = ctx.request.body as userType;

    // 3.将user的信息存入数据库
    const result = await userService.create(user);
    // 4.查看存储的结果，需要返回创建信息给前端
    ctx.body = {
      message: "创建成功",
      data: result
    };
  }
  async avatarInfo(ctx: Context) {
    // 1.先获取用户的id
    const { userId } = ctx.params;

    // 2.获取userId对应的头像信息
    const avatarInfo = await fileService.queryAvatarWithUserId(
      Number(userId)
    ) as IUpload;
    // 3.读取头像所在的文件
    const { filename, mimetype } = avatarInfo;
    ctx.type = mimetype;
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`);
  }
}
const userController = new UserController();
export { userController };
