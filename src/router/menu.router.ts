import KoaRouter from "koa-router";
import { verifyAuth } from "../middleware/login.middleware";
import { menuController } from "../controller/menu.controller";
const menuRouter = new KoaRouter({ prefix: "/menu" });

// 新增菜单/菜单列表
menuRouter.post("/", verifyAuth, menuController.create);
// 查询整个菜单(不建议开放给前端)
menuRouter.post("/list", verifyAuth, menuController.list);

menuRouter.delete("/:menuId", verifyAuth, menuController.delete);

export default menuRouter;
