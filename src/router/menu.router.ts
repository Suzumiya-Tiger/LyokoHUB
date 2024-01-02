import KoaRouter from "koa-router";
import { verifyAuth } from "../middleware/login.middleware";
import { menuController } from "../controller/menu.controller";
import { verifyMenu } from "../middleware/menu.middleware";
const menuRouter = new KoaRouter({ prefix: "/menu" });

// 新增菜单/菜单列表
menuRouter.post("/", verifyAuth, menuController.create);
menuRouter.patch("/:menuId", verifyAuth, verifyMenu, menuController.update);
menuRouter.delete("/:menuId", verifyAuth, menuController.delete);

// 查询整个菜单
menuRouter.post("/list", verifyAuth, menuController.list);

menuRouter.get("/:menuId", verifyAuth, menuController.getMenuInfo);

export default menuRouter;
