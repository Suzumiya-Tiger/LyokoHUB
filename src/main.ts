// 必须安装KOA-ROUTER
// node 不能直接运行 ts 代码，所以需要额外的插件。在这里，我们将用到 esbuild-register 运行 TS 代码。
// 必须安装@types/koa @types/koa-router @types/koa2-cors @types/koa-bodyparser 使得可以在KOA中使用TS
import Koa from "koa";
import { SERVER_PORT } from "./config/server";

import userRouter from "./router/user.router";
const app = new Koa();

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
app.listen(SERVER_PORT, () => {
  console.log("服务器启动成功");
});
