// 必须安装KOA-ROUTER
// node 不能直接运行 ts 代码，所以需要额外的插件。在这里，我们将用到 esbuild-register 运行 TS 代码。
// 必须安装@types/koa @types/koa-router @types/koa2-cors @types/koa-bodyparser 使得可以在KOA中使用TS
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import registerRouter from "../router";
import roleRouter from "../router/role.router";
import menuRouter from "../router/menu.router";
// 1.创建app
const app = new Koa();

// 2.对app使用中间件
// bodyParser必须要在router之前使用
// bodyParser可以将post请求的数据解析到ctx.request.body中
app.use(bodyParser());
registerRouter(app);

// cms的路由
app.use(roleRouter.routes());
app.use(roleRouter.allowedMethods());
app.use(menuRouter.routes());
app.use(menuRouter.allowedMethods());
/* app.use(userRouter.routes());
app.use(loginRouter.routes());
app.use(userRouter.allowedMethods());
app.use(loginRouter.allowedMethods()); */

// 3.导出app
export default app;
