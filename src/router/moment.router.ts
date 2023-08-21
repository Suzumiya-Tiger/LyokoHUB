import KoaRouter from "koa-router";
import { verifyAuth } from "../middleware/login.middleware";
import { momentController } from "../controller/moment.controller";
import verifyPermission from "../middleware/permission.middleware";
import { verifyLabel } from "../middleware/label.middleware";
const momentRouter = new KoaRouter({ prefix: "/moment" });

// 编写接口
// 1.增：创建动态
momentRouter.post("/", verifyAuth, momentController.create);
// 获取动态列表无需验证用户身份
// 2.查：查询动态(列表/id)
momentRouter.get("/list", momentController.getList);
// 因为是用了适配多个表的查询方式，所以/:momentId"对应需要准确写入表名称的前缀
momentRouter.get("/:momentId", momentController.detail);
// 3.删：删除动态
momentRouter.delete(
  "/:momentId",
  verifyAuth,
  verifyPermission,
  momentController.checkIsExist,
  momentController.removeDetail
);
// 4.改：修改动态
// 需要验证：登录的用户方可修改动态
momentRouter.patch(
  "/:momentId",
  verifyAuth,
  verifyPermission,
  momentController.checkIsExist,
  momentController.update
);
// 5.给动态添加标签
/**
 * 中间件：
 * 1.是否登录 √
 * 2.验证是否存在操作该动态的权限 √
 * 3.额外中间件：验证label的name是否存在于label表中
 * 若存在，直接使用
 * 若不存在，将label的name插入到label表中，再使用
 * 4.最终步骤
 * 所有的labels都存在于label表中
 * 将动态和label的关系存入关系表
 */
momentRouter.post(
  "/:momentId/labels",
  verifyAuth,
  verifyPermission,
  verifyLabel,
  momentController.addLabels
);
export default momentRouter;
