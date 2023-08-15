import KoaRouter from "koa-router";
import { verifyAuth } from "../middleware/login.middleware";
import { momentController } from "../controller/moment.controller";
import verifyMomentPermission from "../middleware/permission.middleware";
const momentRouter = new KoaRouter({ prefix: "/moment" });

// 编写接口
// 1.增：创建动态
momentRouter.post("/", verifyAuth, momentController.create);
// 获取动态列表无需验证用户身份
// 2.查：查询动态(列表/id)
momentRouter.get("/list", momentController.getList);
momentRouter.get("/:momentId", momentController.detail);
// 3.删：删除动态

// 4.改：修改动态
// 需要验证：登录的用户方可修改动态
momentRouter.patch(
  "/:momentId",
  verifyAuth,
  verifyMomentPermission,
  momentController.update
);
export default momentRouter;
