// 主入口文件应该尽量简约，只负责导入app和启动app

// 导入app
import app from "./app";
import { SERVER_PORT } from "./config/server";
import { setupArrayErrorHandlers, setupErrorHandlers } from "./utils/handle.error";
setupErrorHandlers();
setupArrayErrorHandlers();
// 启动app
app.listen(SERVER_PORT, () => {
  console.log("服务器启动成功");
});
