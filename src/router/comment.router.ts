import KoaRouter from "koa-router";
import { verifyAuth } from "../middleware/login.middleware";
import { commentController } from "../controller/comment.controller";
const commentRouter = new KoaRouter({ prefix: "/comment" });
// 增：新增评论
commentRouter.post("/", verifyAuth, commentController.create);
export default commentRouter;
