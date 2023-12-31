import app from "../app";
import {
  NAME_OR_PASSWORD_IS_REQUIRED,
  NAME_IS_ALREADY_EXISTS,
  NAME_IS_NOT_EXISTS,
  PASSWORD_IS_INCORRENT,
  UN_AUTHORIZATION,
  OPERATION_IS_NOT_PERMITTED,
  DATA_IS_NOT_EXIST,
  LABEL_IS_ALREADY_EXISTS,
  LABEL_IS_NOT_EXIST,
  ROLENAME_IS_ALREADY_EXISTS,
  ROLENAME_IS_REQUIRED,
  SUEPER_USER_CAN_NOT_BE_DELETED,
  NAME_IS_REQUIRED,
  FORBIDDEN_DELETE,
  NO_PERMISSION_TO_OPERATE,
  MENU_IS_EXIST
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
        message = "该名称已存在,无法注册";
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

      case LABEL_IS_NOT_EXIST:
        code = -1009;
        message = "请输入正确的标签名称";
        break;
      case ROLENAME_IS_ALREADY_EXISTS:
        code = -1010;
        message = "角色名已存在,无法注册";
        break;
      case ROLENAME_IS_REQUIRED:
        code = -1011;
        message = "角色名不能为空";
        break;

      case SUEPER_USER_CAN_NOT_BE_DELETED:
        code = -1012;
        message = "超级管理员不能被删除";
        break;
      case NAME_IS_REQUIRED:
        code = -1013;
        message = "该名称不能为空";
        break;
      case FORBIDDEN_DELETE:
        code = -1014;
        message = "此项受保护，不可删除";
        break;
      case NO_PERMISSION_TO_OPERATE:
        code = -1015;
        message = "非管理员用户不可进行此项受保护数据的操作";
        break;
      case MENU_IS_EXIST:
        code = -1016;
        message = "菜单已存在,无法注册";
        break;
    }
    ctx.body = { code, message };
  });
}
export function setupArrayErrorHandlers() {
  app.on("arrayError", (error, ctx) => {
    let code = 0;
    let message = "";
    switch (error[0]) {
      case LABEL_IS_ALREADY_EXISTS:
        code = -1008;
        message = `标签${error[1]}已存在,无法注册`;
        break;
    }
    ctx.body = { code, message };
  });
}
