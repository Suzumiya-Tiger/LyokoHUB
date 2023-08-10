// 必须安装KOA-ROUTER
// node 不能直接运行 ts 代码，所以需要额外的插件。在这里，我们将用到 esbuild-register 运行 TS 代码。
// 必须安装@types/koa @types/koa-router @types/koa2-cors @types/koa-bodyparser 使得可以在KOA中使用TS
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import userRouter from "../router/user.router";

// 1.创建app
const app = new Koa();
// 2.对app使用中间件
app.use(userRouter.routes());
app.use(bodyParser());
app.use(userRouter.allowedMethods());
// 3.导出app
export default app;
