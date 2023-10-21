import KoaRouter from "koa-router";
import { userController } from "../controller/user.controller";
import { verifyUser, handlePassword } from "../middleware/user.middleware";

// 1.创建路由对象
const userRouter = new KoaRouter({ prefix: "/users" });
// 定义路由映射
// 2.1.用户注册接口

// verifyUser:用户登录时的数据逻辑判断
// userController.create:存入数据的操作
// 对用户传递过来的账户信息和密码进行加密操作
userRouter.post("/", verifyUser, handlePassword, userController.create);
userRouter.patch("/:userId", verifyUser, userController.update);
userRouter.delete("/", verifyUser, userController.delete);
// 2.2为用户提供头像展示
userRouter.get("/:userId/avatar", userController.avatarInfo);
// 查询某个用户
userRouter.get("/:userId", userController.findUserInfo);

// 查询列表
userRouter.post("/list", userController.getUserList);

// 3.导出路由对象
export default userRouter;
