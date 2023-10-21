import KoaRouter from "koa-router";
import { verifyAuth } from "../middleware/login.middleware";
import { departmentController } from "../controller/department.controller";

const koaRouter = new KoaRouter({ prefix: "/department" });

koaRouter.post("/", verifyAuth, departmentController.create);

koaRouter.delete("/:departmentId", verifyAuth, departmentController.delete);

koaRouter.patch("/:departmentId", verifyAuth, departmentController.update);
// 获取某个部门
koaRouter.get("/:departmentId", verifyAuth, departmentController.getDepartmentInfo);
// 获取所有的部门列表
koaRouter.post("/list", verifyAuth, departmentController.getwholeDepartmentInfo);

export default koaRouter;
