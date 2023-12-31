import { connection } from "../app/database";
import { menuType } from "../types/menu";

class MenuService {
  async create(menu: menuType) {
    const statement = `INSERT INTO menu SET ?;`;
    const [result] = await connection.query(statement, [menu]);
    return result;
  }
  async update(id: number, menu: menuType) {
    // UPDATE 语句的作用是在已存在的行中修改列的值，因此它不支持直接将一个对象映射到列。
    let statement = "UPDATE `menu` SET ";
    const params = [];
    // 1.获取用户user
    let keys: keyof menuType;
    for (keys in menu) {
      params.push(menu[keys]);
      statement += `${keys} =?,`;
    }
    statement = statement.slice(0, -1); // 从开头截取到倒数第二个字符
    statement += " WHERE id = ?;";
    const [result] = await connection.execute(statement, [...params, id]);
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
    const [result] = await connection.execute(statement);
    return result;
  }
  async findMenuById(id: number) {
    const statement = "SELECT * FROM `menu` WHERE `id` = ?;";
    const [values] = await connection.execute(statement, [id]);
    return values;
  }
  async findMenuByName(name: string) {
    const statement = "SELECT * FROM `menu` WHERE `name` = ?;";
    const [values] = await connection.execute(statement, [name]);
    return values;
  }
}

export default new MenuService();
