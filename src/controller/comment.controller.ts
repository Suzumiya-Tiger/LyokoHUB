import { Context } from "koa"; // 导入 Context 类型
import { commentService } from "../service/comment.service";
import { userType } from "../types/service";
class CommentController {
  async create(ctx: Context) {
    //   1.获取body中的参数
    const { content, momentId } = ctx.request.body as userType;
    const { id } = ctx.user;

    //   2.操作数据库,将数据进行存储
    const result = await commentService.create(content, momentId, id);
    ctx.body = {
      code: 0,
      message: "评论成功",
      data: result
    };
  }

  async reply(ctx: Context) {
    //   1.获取body中的参数
    const { content, momentId, commentId } = ctx.request.body as userType;
    const { id } = ctx.user;
    ctx.body = `回复评论成功~`;
    //   2.操作数据库,将数据进行存储
    const result = await commentService.reply(content, momentId, commentId, id);
    ctx.body = {
      code: 0,
      message: "回复评论成功",
      data: result
    };
  }
}
const commentController = new CommentController();
export { commentController };
