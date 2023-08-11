import KoaRouter from "koa-router";
import { userController } from "../controller/user.controller";
import { verifyUser } from "../middleware/user.middleware";

// 1.创建路由对象
const userRouter = new KoaRouter({ prefix: "/users" });
// 定义路由映射
// 2.1.用户注册接口
userRouter.post("/", verifyUser, userController.create);
// 3.导出路由对象
export default userRouter;
