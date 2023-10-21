import KoaRouter from "koa-router";
import { verifyAuth } from "../middleware/login.middleware";
import { categoryController } from "../controller/category.controller";

const koaRouter = new KoaRouter({ prefix: "/category" });

koaRouter.post("/", verifyAuth, categoryController.create);
koaRouter.post("/batchAdditions", verifyAuth, categoryController.batchAdditions);
koaRouter.delete("/:categoryId", verifyAuth, categoryController.delete);

koaRouter.patch("/:categoryId", verifyAuth, categoryController.update);
// 获取某个部门
koaRouter.get("/:categoryId", verifyAuth, categoryController.getCategoryInfo);
// 获取所有的部门列表
koaRouter.post("/list", verifyAuth, categoryController.getwholeCategoryInfo);


export default koaRouter;
