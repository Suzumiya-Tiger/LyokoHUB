import { connection } from "../app/database";

class LabelService {
  // 根据用户名查询用户是否存在
  async checkLabelExist(name: string) {
    const statement = "SELECT * FROM `label` WHERE `name` = ?;";
    const [values] = await connection.execute(statement, [name]);
    return values;
  }
  async create(name: string) {
    const statement = `INSERT INTO label (name) VALUES (?);`;
    const [result] = await connection.execute(statement, [name]);
    return result;
  }
  queryList(offset: string | string[] = "0", size: string | string[] = "10") {
    const statement = `SELECT * FROM label LIMIT ?,?;`;
    return connection.execute(statement, [offset, size]);
  }
}
const labelService = new LabelService();
export { labelService };
