import KoaRouter from "koa-router";
import { verifyAuth } from "../middleware/login.middleware";
import { labelController } from "../controller/label.controller";
import { verifyCreateLabel } from "../middleware/label.middleware";

const labelRouter = new KoaRouter({ prefix: "/label" });
labelRouter.post("/", verifyAuth, verifyCreateLabel, labelController.create);
labelRouter.get("/", labelController.getList);
export default labelRouter;
