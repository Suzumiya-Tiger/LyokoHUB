import { Context } from "koa"; // 导入 Context 类型
import { userService } from "../service/user.service";
import type { IUser } from "../types/user";
import { fileService } from "../service/file.service";
import { IUpload } from "../types/upload";
import fs from "fs";
import { UPLOAD_PATH } from "../config/path";

import { SUEPER_USER_CAN_NOT_BE_DELETED } from "../config/error-constants";

class UserController {
  async create(ctx: Context) {
    // 1.获取用户传递过来的信息
    const user = ctx.request.body as IUser;
    // 3.将user的信息存入数据库
    await userService.create(user);
    const result = await userService.createRoleUser(user);
    // 4.查看存储的结果，需要返回创建信息给前端
    ctx.body = {
      message: "创建成功",
      data: result
    };
  }
  async update(ctx: Context) {
    const { userId } = ctx.params;
    // 1.获取用户传递过来的信息
    if (Number(userId) === 1) {
      return ctx.app.emit("error", SUEPER_USER_CAN_NOT_BE_DELETED, ctx);
    }
    const user = ctx.request.body as IUser;
    const id = ctx.params.userId;
    // 3.将user的信息存入数据库
    const result = await userService.update(id, user);
    ctx.body = {
      message: "修改成功",
      data: result
    };
  }
  async delete(ctx: Context) {
    // 1.先获取用户的id
    const { userId } = ctx.params;
    if (Number(userId) === 1) {
      return ctx.app.emit("error", SUEPER_USER_CAN_NOT_BE_DELETED, ctx);
    }
    const result = await userService.delete(Number(userId));
    ctx.body = {
      message: "删除成功",
      data: result
    };
  }
  async findUserInfo(ctx: Context) {
    // 1.先获取用户的id
    const { userId } = ctx.params;
    const result = (await userService.findUserById(Number(userId))) as IUser[];
    ctx.body = {
      data: result[0]
    };
  }
  async getUserList(ctx: Context) {
    const requestInfo = ctx.request.body as IUser;
    const result = (await userService.getUserList(requestInfo)) as IUser[];
    ctx.body = {
      data: {
        list: result,
        totalCount: result.length
      },
      message: "查询成功"
    };
  }
  async avatarInfo(ctx: Context) {
    // 1.先获取用户的id
    const { userId } = ctx.params;

    // 2.获取userId对应的头像信息
    const avatarInfo = (await fileService.queryAvatarWithUserId(
      Number(userId)
    )) as IUpload;
    // 3.读取头像所在的文件
    const { filename, mimetype } = avatarInfo;
    ctx.type = mimetype;
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`);
  }
}
const userController = new UserController();
export { userController };
