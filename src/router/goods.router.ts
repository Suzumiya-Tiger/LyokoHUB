import KoaRouter from "koa-router";
import { verifyAuth } from "../middleware/login.middleware";
import { goodsController } from "../controller/goods.controller";
import { categoryController } from "../controller/category.controller";
const koaRouter = new KoaRouter({ prefix: "/goods" });

koaRouter.post("/", verifyAuth, goodsController.create);
koaRouter.post("/batchAdditions", verifyAuth, goodsController.batchAdditions);
koaRouter.delete("/:goodsId", verifyAuth, goodsController.delete);

koaRouter.patch("/:goodsId", verifyAuth, goodsController.update);
// 获取某个部门
koaRouter.get("/:goodsId", verifyAuth, goodsController.getGoodsInfo);
// 获取所有的部门列表
koaRouter.post("/list", verifyAuth, goodsController.getwholeGoodsInfo);

/* 图表数据 */
koaRouter.get("/category/count", verifyAuth, categoryController.getCategoryCount);
koaRouter.get("/category/sale", verifyAuth, categoryController.getCategorySaleCount);
koaRouter.get("/category/favor", verifyAuth, categoryController.getCategoryFavor);
koaRouter.get("/address/sale", verifyAuth, categoryController.getAreaSale);
koaRouter.get("/amount/list", verifyAuth, categoryController.getCategoryStatistic);

export default koaRouter;
