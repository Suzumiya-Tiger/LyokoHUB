import { connection } from "../app/database";

class LabelService {
  // 根据用户名查询用户是否存在
  async checkLabelExist(name: string) {
    const statement = "SELECT * FROM `label` WHERE `name` = ?;";
    const [values] = await connection.execute(statement, [name]);
    return values;
  }
  create(name: string) {
    const statement = `INSERT INTO label (name) VALUES (?);`;
    connection.execute(statement, [name]);
  }
}
const labelService = new LabelService();
export { labelService };
