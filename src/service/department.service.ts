import { connection } from "../app/database";
import { departmentType } from "../types/department";

class DepartMentService {
  async create(department: departmentType) {
    const statement = `INSERT INTO department SET ?;`;
    const [result] = await connection.query(statement, [department]);
    return result;
  }
  async update(id: number, department: departmentType) {
    // UPDATE 语句的作用是在已存在的行中修改列的值，因此它不支持直接将一个对象映射到列。
    let statement = "UPDATE `department` SET ";
    const params = [];
    // 1.获取用户user
    let keys: keyof departmentType;
    for (keys in department) {
      params.push(department[keys]);
      statement += `${keys} =?,`;
    }
    statement = statement.slice(0, -1); // 从开头截取到倒数第二个字符
    statement += " WHERE id = ?;";
    const [result] = await connection.execute(statement, [...params, id]);
    return result;
  }
  async delete(departmentId: number) {
    const statement = `DELETE FROM department WHERE id = ?;`;
    const [result] = await connection.query(statement, [departmentId]);
    return result;
  }
  async getDepartmentInfo(departmentId: number) {
    const statement = `SELECT * FROM department WHERE id = ?;`;
    const [result] = await connection.query(statement, [departmentId]);
    return result;
  }
  async getwholeDepartmentInfo() {
    const statement = `SELECT * FROM department;`;
    const [result] = await connection.query(statement);
    return result;
  }
  async updateDepartment(department: departmentType, departmentId: number) {
    const statement = `UPDATE department SET ? WHERE id = ?;`;
    const [result] = await connection.query(statement, [department, departmentId]);
    return result;
  }
  async findDepartmentByName(name: string) {
    const statement = "SELECT * FROM `department` WHERE `name` = ?;";
    const [values] = await connection.execute(statement, [name]);
    return values;
  }
}
const departmentService = new DepartMentService();
export default departmentService;
