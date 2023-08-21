import { Context } from "koa"; // 导入 Context 类型
class FileController {
  async upload(ctx: Context) {
    if (typeof ctx.request === "object" && ctx.request !== null) {
      if ("file" in ctx.request) {
        const { file } = ctx.request;
        ctx.body = {
          code: 0,
          message: "上传成功",
          data: file
        };
      }
    }
  }
}
const fileController = new FileController();
export { fileController };
