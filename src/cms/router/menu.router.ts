import KoaRouter from "koa-router";
import { verifyAuth } from "../../middleware/login.middleware";
import { menuController } from "../controller/menu.controller";
const menuRouter = new KoaRouter({ prefix: "/menu" });

// 新增菜单/菜单列表
menuRouter.post("/", verifyAuth, menuController.create);
menuRouter.get("/", verifyAuth, menuController.list);

export default menuRouter;
