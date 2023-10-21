import { connection } from "../app/database";
import { departmentType } from "../types/department";

class DepartMentService {
  async create(department: departmentType) {
    const statement = `INSERT INTO department SET ?;`;
    const [result] = await connection.query(statement, [department]);
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
}
const departmentService = new DepartMentService();
export default departmentService;
