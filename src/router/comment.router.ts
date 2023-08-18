import KoaRouter from "koa-router";
import { verifyAuth } from "../middleware/login.middleware";
import { commentController } from "../controller/comment.controller";
const commentRouter = new KoaRouter({ prefix: "/comment" });
// 增：新增评论
// 核验数据库是否存在该条评论

commentRouter.post(
  "/",
  verifyAuth,
  commentController.checkIsExist,
  commentController.create
);
// 增：回复评论
commentRouter.post(
  "/reply",
  verifyAuth,
  commentController.checkIsExist,
  commentController.reply
);
export default commentRouter;
