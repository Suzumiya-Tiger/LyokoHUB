import { Context } from "koa"; // 导入 Context 类型
import type { IUpload } from "../types/upload";
import { fileService } from "../service/file.service";
class FileController {
  async upload(ctx: Context) {
    if (typeof ctx.request === "object" && ctx.request !== null) {
      if ("file" in ctx.request) {
        const { filename, mimetype, size } = ctx.request.file as IUpload;
        const { id } = ctx.user;
        // 解析图片信息并且结合id进行存储
        const result = await fileService.create(filename, mimetype, size, id);
        // 3.返回结果
        ctx.body = {
          code: 0,
          message: "文件上传成功",
          data: result
        };
      }
    }
  }
}
const fileController = new FileController();
export { fileController };
