const Koa = require("koa");
const KoaRouter = require("@koa/router");
const { SERVER_PORT } = require("./config/server.js");
const app = new Koa();
const userRouter = new KoaRouter({ prefix: "/users" });
userRouter.get("/list", (ctx, next) => {
  ctx.body = "userList访问成功！";
});

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
app.listen(SERVER_PORT, () => {
  console.log("服务器启动成功");
});
