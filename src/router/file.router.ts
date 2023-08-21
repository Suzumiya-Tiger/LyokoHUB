import KoaRouter from "koa-router";
import { fileController } from "../controller/file.controller";
import { verifyAuth } from "../middleware/login.middleware";
import { handleAvatar } from "../middleware/file.middleware";

const fileRouter = new KoaRouter({ prefix: "/file" });
//  file/avatar=>上传头像
fileRouter.post("/avatar", verifyAuth, handleAvatar, fileController.upload);

export default fileRouter;
