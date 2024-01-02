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
import type { IUser } from "../types/user";
// UserService用于处理MYSQL数据库的相关操作
class UserService {
  // 将user对象保存到数据库之中;
  async create(user: IUser) {
    const statement = `INSERT INTO user SET ?;`;
    const [result] = await connection.query(statement, [user]);
    return result;
  }
  async createRoleUser(user: IUser) {
    const userInfo = (await this.findUserByName(user.name)) as IUser[];
    const roleUserStatement = `INSERT INTO role_user (roleId,userId) VALUES(?,?);`;
    await connection.execute(roleUserStatement, [user.role_id, userInfo[0].id]);
  }
  async update(id: number, user: IUser) {
    // UPDATE 语句的作用是在已存在的行中修改列的值，因此它不支持直接将一个对象映射到列。
    let statement = "UPDATE `user` SET ";
    const params = [];
    // 1.获取用户user
    let keys: keyof IUser;
    for (keys in user) {
      params.push(user[keys]);
      statement += `${keys} =?,`;
    }
    statement = statement.slice(0, -1); // 从开头截取到倒数第二个字符
    statement += " WHERE id = ?;";
    const [result] = await connection.execute(statement, [...params, id]);
    return result;
  }
  async delete(id: number) {
    const statement = "DELETE FROM `user` WHERE `id` = ?;";
    const [values] = await connection.execute(statement, [id]);
    return values;
  }
  // 根据用户名查询用户是否存在
  async findUserByName(name: string) {
    const statement = "SELECT * FROM `user` WHERE `name` = ?;";
    const [values] = await connection.execute(statement, [name]);
    return values;
  }
  // 根据用户id查询用户的信息
  async findUserById(id: number) {
    const statement = "SELECT name,id,createAt,updateAt FROM `user` WHERE `id` = ?;";
    const [values] = await connection.execute(statement, [id]);
    return values;
  }
  async getUserList(userInfo?: IUser) {
    let statement =
      "SELECT name,id,realname,cellphone,departmentId,avatar_url,enable,createAt,updateAt FROM `user` WHERE 1=1";
    const params = [];
    let keys: keyof IUser;
    for (keys in userInfo) {
      if (keys === "size" || keys === "offset") {
        continue;
      }
      if (userInfo[keys]) {
        statement += ` AND ${keys} = ?`;
        params.push(userInfo[keys]);
      }
    }
    statement += " LIMIT ?,?;";
    const offset =
      userInfo.offset || userInfo.offset === 0 ? String(userInfo.offset) : "0";
    const size = userInfo.size || userInfo.size === 0 ? String(userInfo.size) : "10";
    params.push(offset);
    params.push(size);

    const [result] = await connection.execute(statement, [...params]);
    return result;
  }
  async getUserTotalCount() {
    const statement = "SELECT COUNT(*) as totalCount FROM `user`";
    const [result] = await connection.execute(statement, []);
    return result;
  }
  async updateUserAvatar(avatarUrl: string, userId: number) {
    const statement = `UPDATE user SET avatar_url=? WHERE id = ?;`;
    const [result] = await connection.execute(statement, [avatarUrl, userId]);
    return result;
  }
}
const userService = new UserService();
export { userService };
