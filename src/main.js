import Koa from "koa";
import KoaRouter from "@koa/router";
import { SERVER_PORT } from "./config/server.js";
const app = new Koa();
const userRouter = new KoaRouter({ prefix: "/users" });
userRouter.get("/list", (ctx, next) => {
  console.log(next);
  ctx.body = "userList访问成功！";
});

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
app.listen(SERVER_PORT, () => {
  console.log("服务器启动成功");
});
