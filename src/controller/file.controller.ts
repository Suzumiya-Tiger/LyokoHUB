import { Context } from "koa"; // 导入 Context 类型
import type { IUpload } from "../types/upload";
import { fileService } from "../service/file.service";
import { userService } from "../service/user.service";
import { SERVER_PORT, SERVER_HOST } from "../config/server";
class FileController {
  async upload(ctx: Context) {
    if (typeof ctx.request === "object" && ctx.request !== null) {
      if ("file" in ctx.request) {
        const { filename, mimetype, size } = ctx.request.file as IUpload;
        const { id } = ctx.user;
        // 解析图片信息并且结合id进行存储
        await fileService.create(filename, mimetype, size, id);
        // 3.将头像的地址信息存入user表中
        const avatar_url = `${SERVER_HOST}:${SERVER_PORT}/users/${id}/avatar`;
        await userService.updateUserAvatar(avatar_url, id);
        // 3.返回结果
        ctx.body = {
          code: 0,
          message: "文件上传成功",
          data: avatar_url
        };
      }
    }
  }
}
const fileController = new FileController();
export { fileController };
