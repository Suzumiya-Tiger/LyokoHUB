import KoaRouter from "koa-router";
import { roleController } from "../controller/role.controller";
import { verifyAuth } from "../middleware/login.middleware";
import { verifyRole } from "../middleware/role.middleware";

const roleRouter = new KoaRouter({ prefix: "/role" });
// 增删改查
roleRouter.post("/", verifyAuth, verifyRole, roleController.create);
roleRouter.delete("/:roleId", verifyAuth, roleController.remove);
roleRouter.patch("/:roleId", verifyAuth, verifyRole, roleController.update);
// 获取所有角色的菜单映射列表
roleRouter.post("/list", verifyAuth, roleController.list);
roleRouter.get("/:roleId", verifyAuth, roleController.findRoleById);
roleRouter.post("/name", verifyAuth, roleController.findRoleByName);

// 根据角色id插入菜单权限
roleRouter.post("/:roleId/menu", verifyAuth, roleController.assignMenu);
// 根据角色id查询菜单权限
roleRouter.get("/:roleId/menu", verifyAuth, roleController.searchMenuById);

// 为人员赋予角色权限
roleRouter.post("/user_role/:userId", verifyAuth, roleController.assignUser);
export default roleRouter;
