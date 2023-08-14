// 本文件是为了定义登录相关的路由
import KoaRouter from "koa-router";
import { loginController } from "../controller/login.conmtroller";
import { verifyAuth, verifyLogin } from "../middleware/login.middleware";
const loginRouter = new KoaRouter({ prefix: "/login" });

loginRouter.post("/", verifyLogin, loginController.sign);

loginRouter.post("/test",verifyAuth, loginController.test);
export default loginRouter;
