import { connection } from "../app/database";
import { roleType } from "../types/role";
import type { roleMenuType } from "../types/roleMenu";
import menuService from "./menu.service";
import { menuType } from "../types/menu";
/* 使用connection.query时，传入的参数必须是Number类型，使用execute则传入字符串类型 */
class RoleService {
  private replaceLastCommaWithSemicolon(str: string) {
    const lastCommaIndex = str.lastIndexOf(",");
    if (lastCommaIndex !== -1) {
      const replacedString =
        str.slice(0, lastCommaIndex) + ";" + str.slice(lastCommaIndex + 1);
      return replacedString;
    }
    return str;
  }
  // 将传入的 role 对象插入到数据库的 role 表中
  async create(role: roleType) {
    // INSERT INTO role SET 是一个插入表数据的预处理语句
    // 通过connection.query()方法执行预处理语句，使得role对象里面的属性被依次遍历并插入到数据库表中
    const roleData = Object.assign({}, role);
    if (roleData.menuList) {
      delete roleData.menuList;
    }
    const statement = `INSERT INTO role SET ?`;
    // 结果被解构分配给了一个名为 result 的变量中。在这里，它可能包含了插入成功的相关信息。
    const [createResult] = await connection.query(statement, [roleData]);
    const searchIdStatement = `SELECT id FROM role WHERE name=?;`;
    const [searchSesult] = (await connection.query(searchIdStatement, [
      role.name
    ])) as Array<roleType>;
    // 为role_menu添加数据
    if (Array.isArray(searchSesult) && searchSesult.length) {
      const role_id = searchSesult[0].id;
      if (role.menuList && role.menuList.length) {
        await this.insetRoleMenu(role_id, role.menuList as Array<number>);
      }
      return createResult;
    }
  }
  /* 同步更新role_menu用 */
  async insetRoleMenu(roleId: number, menuIds: number[]) {
    const insertStatement = `INSERT INTO role_menu (roleId, menuId) VALUES (?, ?);`;
    /**
     * 当一个列被定义为外键时，它指向另一个表的特定列，以确保引用的完整性。在这种情况下，插入操作必须遵守以下规则：
     * 引用完整性规则：插入的值必须在被引用的表中存在，否则会引发外键约束错误。
     * (重要)一次插入一个值：不能在一个 INSERT 语句中插入多个值，每次插入一个。
     * 或者使用事务：如果你想要一次性插入多行数据，你可以使用事务。在事务内，所有的插入将一次性提交或回滚。
     */
    for (const menuItem of menuIds) {
      await connection.execute(insertStatement, [roleId, menuItem]);
    }
  }
  async update(id: number, role: roleType) {
    // 再添加基本role信息
    // UPDATE 语句的作用是在已存在的行中修改列的值，因此它不支持直接将一个对象映射到列。
    let statement = "UPDATE `role` SET ";
    const params = [];
    // 1.获取用户user
    let keys: keyof roleType;
    for (keys in role) {
      if (keys === "menuList") {
        break;
      }
      params.push(role[keys]);
      statement += `${keys} =?,`;
    }
    statement = statement.slice(0, -1); // 从开头截取到倒数第二个字符
    statement += " WHERE id = ?;";
    const [roleResult] = await connection.execute(statement, [...params, id]);
    // 开始处理role_menu表
    // 先删除原始role_menu映射
    if (role.menuList) {
      const roleMenuList = role.menuList as Array<number>;
      const deleteStatement = `DELETE FROM role_menu WHERE roleId=?;`;
      await connection.execute(deleteStatement, [id]);
      // 再重新添加新的role_menu映射
      await this.insetRoleMenu(id, roleMenuList);
    }
    return roleResult;
  }
  async list(roleInfo: roleType) {
    let statement = "SELECT * FROM role WHERE 1=1";
    const params = [];
    let keys: keyof roleType;
    for (keys in roleInfo) {
      if (keys === "size" || keys === "offset") {
        continue;
      }
      if (roleInfo[keys]) {
        statement += ` AND ${keys} = ?`;
        params.push(roleInfo[keys]);
      }
    }
    statement += " LIMIT ?,?;";
    const offset =
      roleInfo.offset || roleInfo.offset === 0 ? String(roleInfo.offset) : "0";
    const size = roleInfo.size || roleInfo.size === 0 ? String(roleInfo.size) : "10";
    params.push(offset);
    params.push(size);
    const [result] = await connection.execute(statement, [...params]);
    return result;
  }
  async delete(id: number) {
    const statement = "DELETE FROM `role` WHERE `id` = ?;";
    const [values] = await connection.execute(statement, [id]);
    return values;
  }
  async findRoleById(id: number) {
    const statement = "SELECT * FROM `role` WHERE `id` = ?;";
    const [values] = await connection.execute(statement, [id]);
    return values;
  }
  async findRoleByName(name: string) {
    const statement = "SELECT * FROM `role` WHERE `name` = ?;";
    const [values] = await connection.execute(statement, [name]);
    return values;
  }
  // 为人员赋予角色权限
  async assignUser(roleId: number, userId: number) {
    // 1.先删除之前的关系
    const updateRoleStatement = `UPDATE role SET user_id = ? WHERE id = ?;`;
    await connection.execute(updateRoleStatement, [userId, roleId]);

    const updateUserStatement = `UPDATE
    user SET role_id = ?
    WHERE id = ?;`;
    const [result] = await connection.query(updateUserStatement, [roleId, userId]);

    return result;
  }
  async assignMenu(roleId: number, menuIds: Array<number>) {
    // 1.先删除之前的关系
    const deleteStatement = `DELETE FROM role_menu WHERE roleId=?;`;
    await connection.execute(deleteStatement, [roleId]);

    // 2.插入新的值
    const insertStatement = `INSERT INTO role_menu (roleId,menuId) VALUES (?,?);`;
    for (const menuId of menuIds) {
      await connection.query(insertStatement, [roleId, menuId]);
    }
  }

  async getRoleMenu(roleId: number) {
    // 1.根据roleId获取所有的menuId
    const getMenuIdsStatement = `SELECT 
    rm.roleId ,JSON_ARRAYAGG(rm.menuId) menuIds 
    FROM role_menu rm
    WHERE rm.roleId=?
    GROUP BY rm.roleId;`;
    const roleMenuIds = (await connection.query(getMenuIdsStatement, [roleId]))[0];

    if (Array.isArray(roleMenuIds) && !!roleMenuIds.length) {
      const { menuIds } = roleMenuIds[0] as roleMenuType;

      // 2.根据menuId获取所有的menu
      const wholeMenu = await menuService.wholeMenu();
      // 3.从完整的菜单树中，过滤到menuIds
      const getMenu = function filtermenu(menu: Array<menuType>) {
        const newMenu = [];
        for (const item of menu) {
          if (item.children) {
            // 看清楚，每次递归调用的时候，都是新建一个newMenu数组，然后将符合条件的item push进去
            // 所以最终得到的newMenu数组，就是符合条件的item的集合，和原本的menu数组结构一模一样
            item.children = filtermenu(item.children);
          }
          if (menuIds.includes(item.id)) {
            newMenu.push(item);
          }
        }
        return newMenu;
      };
      const finalMenu = getMenu(wholeMenu as Array<menuType>);
      return finalMenu;
    }
  }
}
const roleService = new RoleService();
export { roleService };
