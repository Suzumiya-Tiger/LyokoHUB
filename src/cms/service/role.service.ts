import { connection } from "../../app/database";
import type { userType } from "../../types/service";
import type { roleMenuType } from "../../types/roleMenu";
import menuService from "./menu.service";
import { menuType } from "../../types/menu";
/* 使用connection.query时，传入的参数必须是Number类型，使用execute则传入字符串类型 */
class RoleService {
  // 将传入的 role 对象插入到数据库的 role 表中
  async create(role: userType) {
    //   编写SQL语句
    // INSERT INTO role SET 是一个插入表数据的预处理语句
    // 通过connection.query()方法执行预处理语句，使得role对象里面的属性被依次遍历并插入到数据库表中
    const statement = `INSERT INTO role SET ?`;
    // 结果被解构分配给了一个名为 result 的变量中。在这里，它可能包含了插入成功的相关信息。
    const [result] = await connection.query(statement, [role]);
    return result;
  }
  async list(offset: number, size: number) {
    const statement = `SELECT * FROM role LIMIT ?,?;`;
    const [result] = await connection.query(statement, [offset, size]);
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
