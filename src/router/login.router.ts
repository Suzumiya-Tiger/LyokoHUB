// 本文件是为了定义各个业务场景下的路由，以及路由对应的中间件
import KoaRouter from "koa-router";
import { loginController } from "../controller/login.controller";
// //verfityAuth用于验证token的有效性
import { verifyAuth, verifyLogin } from "../middleware/login.middleware";
const loginRouter = new KoaRouter({ prefix: "/login" });
// 验证登录的有效性，颁发token(private_key)
loginRouter.post("/", verifyLogin, loginController.sign);
// 验证token的有效性(public_key)
loginRouter.post("/test", verifyAuth, loginController.test);
export default loginRouter;
