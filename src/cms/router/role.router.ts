import KoaRouter from "koa-router";
import { roleController } from "../controller/role.controller";
import { verifyAuth } from "../../middleware/login.middleware";

const roleRouter = new KoaRouter({ prefix: "/role" });
// 增删改查
roleRouter.post("/", verifyAuth, roleController.create);
roleRouter.delete("/:roleId", verifyAuth, roleController.remove);
roleRouter.patch("/:roleId", verifyAuth, roleController.update);
roleRouter.get("/", verifyAuth, roleController.list);
roleRouter.get("/:roleId", verifyAuth, roleController.detail);

// 为角色分配权限
roleRouter.post("/:roleId/menu", verifyAuth, roleController.assignMenu);
export default roleRouter;
