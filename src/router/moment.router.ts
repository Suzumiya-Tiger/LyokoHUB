import KoaRouter from "koa-router";
import { verifyAuth } from "../middleware/login.middleware";
import { momentController } from "../controller/moment.controller";
const momentRouter = new KoaRouter({ prefix: "/moment" });

// 编写接口
// 创建动态
momentRouter.post("/", verifyAuth, momentController.create);

export default momentRouter;
