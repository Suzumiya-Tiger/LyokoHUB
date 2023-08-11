import app from "../app";
import {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS
} from "../config/error-constants";
export function setupErrorHandlers() {
  // app.on的事件监听器是非常灵活的，可以在其他的中间件通过ctx.app.emit触发，
  // 然后在这里接收到事件，然后做相应的处理
  app.on("error", (error, ctx) => {
    let code = 0;
    let message = "";
    switch (error) {
      case NAME_OR_PASSWORD_IS_REQUIRED:
        code = -1001;
        message = "用户名或者密码不能为空";
        break;
      case NAME_IS_ALREADY_EXISTS:
        (code = -1002), (message = "用户名已存在,无法注册");
        break;
    }
    ctx.body = { code, message };
  });
}
