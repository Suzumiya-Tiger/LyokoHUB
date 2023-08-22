// 本文件是为了建立数据库和数据的连接使用

/* 在 Node.js 中，require 是一种同步加载模块的方式，
而 import 是一种异步加载 ES6 模块的方式。这就是为什么在使用 require 时，
被导入的模块会立即执行，而在使用 import 时，被导入的模块不会立即执行。
--------------------------------------------------------------------
当你使用 require 导入一个模块时，
Node.js 会立即加载并执行该模块，然后将模块的导出内容赋值给你的变量。
而import属于异步加载，被导入的模块不会立即执行，
它会被延迟到模块被首次使用的时候执行。
这种异步加载的机制使得 ES6 模块可以更好地优化模块的加载和执行，以及实现动态导入的功能。
*/
// const connection = require("../app/database");

import { connection } from "../app/database";
import type { userType } from "../types/service";
// UserService用于处理MYSQL数据库的相关操作
class UserService {
  // 将user对象保存到数据库之中;
  async create(user: userType) {
    // 1.获取用户user
    const { name, password } = user;
    // 2.拼接statemnt
    const statement = "INSERT INTO `user` (name,password) VALUES(?,?);";

    // 3.执行sql语句
    // connection.excute()是一个异步操作，返回一个promise对象
    /*      通过 [result] 这种解构赋值写法，你实际上是在从返回的数组中提取第一个元素，
     并将其赋值给 result 变量。 */
    const [result] = await connection.execute(statement, [name, password]);
    return result;
  }

  // 根据用户名查询用户是否存在
  async findUserByName(name: string) {
    const statement = "SELECT * FROM `user` WHERE `name` = ?;";
    const [values] = await connection.execute(statement, [name]);
    return values;
  }
  async updateUserAvatar(avatarUrl: string, userId: number) {
    const statement = `UPDATE user SET avatar_url=? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }
}
const userService = new UserService();
export { userService };
