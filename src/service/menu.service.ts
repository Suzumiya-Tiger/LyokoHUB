import { connection } from "../app/database";
import { menuType } from "../types/menu";

class MenuService {
  async create(menu: menuType) {
    const statement = `INSERT INTO menu SET ?;`;
    const [result] = await connection.query(statement, [menu]);
    return result;
  }
  async delete(menuId: number) {
    const statement = `DELETE FROM menu WHERE id = ?;`;
    const [result] = await connection.query(statement, [menuId]);
    return result;
  }
  async wholeMenu() {
    const statement = `SELECT 
	m1.id id, m1.name name, m1.type type, m1.url url, m1.icon icon, m1.sort sort, m1.createAt createAt, m1.updateAt updateAt,
	(SELECT JSON_ARRAYAGG(
		JSON_OBJECT("id", m2.id, "name", m2.name, "type", m2.type, "parentId", m2.parentId, "url", m2.url, "sort", m2.sort, "createAt", m2.createAt, "updateAt", m2.updateAt,
		"children", (SELECT JSON_ARRAYAGG(
			JSON_OBJECT("id", m3.id, "name", m3.name, "type", m3.type, "parentId", m3.parentId, "url", m3.url, "sort", m3.sort, "permission", m3.permission, "createAt", m3.createAt, "updateAt", m3.updateAt)
		) FROM menu m3 WHERE m3.parentId = m2.id ORDER BY m3.sort))
	) FROM menu m2 WHERE m1.id = m2.parentId ORDER BY m2.sort) children
FROM menu m1 
WHERE m1.type = 1;`;
    const [result] = await connection.query(statement);
    return result;
  }
  async userMenu() {
    const statement = `SELECT menuId from role_menu where roleId = ?;`;
    const [result] = await connection.query(statement);
    return result;
  }
}

export default new MenuService();
