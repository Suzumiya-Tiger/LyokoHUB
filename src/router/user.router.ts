import KoaRouter from "koa-router";
// 1.创建路由对象
const userRouter = new KoaRouter({ prefix: "/users" });
// 定义路由映射
userRouter.get("/list", ctx => {
  ctx.body = "userList访问成功！";
});
// 3.导出路由对象
export default userRouter;
