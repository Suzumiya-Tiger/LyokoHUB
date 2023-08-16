import app from "../app";
import {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UN_AUTHORIZATION,
  OPERATION_IS_NOT_PERMITTED,
  DATA_IS_NOT_EXIST
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
        code = -1002;
        message = "用户名已存在,无法注册";
        break;
      case NAME_IS_NOT_EXISTS:
        code = -1003;
        message = "登录的用户名不存在，请检查您的用户名";
        break;
      case PASSWORD_IS_INCORRENT:
        code = -1004;
        message = "密码错误，请重新输入";
        break;
      case UN_AUTHORIZATION:
        code = -1005;
        message = "无效的token";
        break;
      case OPERATION_IS_NOT_PERMITTED:
        code = -1006;
        message = "您没有权限进行此操作";
        break;
      case DATA_IS_NOT_EXIST:
        code = -1007;
        message = "您操作的该条数据不存在";
        break;
    }
    ctx.body = { code, message };
  });
}
