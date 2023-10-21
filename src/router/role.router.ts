import KoaRouter from "koa-router";
import { roleController } from "../controller/role.controller";
import { verifyAuth } from "../middleware/login.middleware";

const roleRouter = new KoaRouter({ prefix: "/role" });
// 增删改查
roleRouter.post("/", verifyAuth, roleController.create);
roleRouter.delete("/:roleId", verifyAuth, roleController.remove);
roleRouter.patch("/:roleId", verifyAuth, roleController.update);
// 获取所有角色的菜单映射列表
roleRouter.post("/list", verifyAuth, roleController.list);
roleRouter.get("/:roleId", verifyAuth, roleController.detail);

// 根据角色id插入菜单权限
roleRouter.post("/:roleId/menu", verifyAuth, roleController.assignMenu);
// 根据角色id查询菜单权限
roleRouter.get("/:roleId/menu", verifyAuth, roleController.searchMenuById);

// 为人员赋予角色权限
roleRouter.post("/user_role/:userId", verifyAuth, roleController.assignUser);
export default roleRouter;
