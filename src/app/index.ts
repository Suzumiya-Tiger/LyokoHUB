// 必须安装koa-router
// 常规的基于commonJS的koa插件不能直接运行 ts 代码，所以需要额外的插件。在这里，我们将用到 esbuild-register 运行 TS 代码。
// 必须安装@types/koa @types/koa-router @types/koa2-cors @types/koa-bodyparser 使得可以在Koa中使用TS
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import registerRouter from "../router";
// 1.创建app
const app = new Koa();

// 2.对app使用中间件
// bodyParser必须要在router之前使用
// bodyParser可以将post请求的数据解析到ctx.request.body中
app.use(bodyParser());
registerRouter(app);

// 3.导出app
export default app;
