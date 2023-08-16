import { connection } from "../app/database";

class PermissionService {
  async checkMoment(momentId: string, userId: string) {
    const statement = "SELECT * FROM moment WHERE id= ? AND user_id=?;";
    const [result] = await connection.execute(statement, [momentId, userId]);
    if (Array.isArray(result)) return !!result.length;
  }
  // 更为通用的利用resourceName进行多种类型的表的数据匹配查询
  async checkResource(resourceName: string, resourceId: string, userId: string) {
    const statement = `SELECT * FROM ${resourceName} WHERE id= ? AND user_id=?;`;
    const [result] = await connection.execute(statement, [resourceId, userId]);
    if (Array.isArray(result)) return !!result.length;
  }
  async checkExist(resourceName: string, resourceId: string) {
    const statement = `SELECT * FROM ${resourceName} WHERE id= ?;`;
    const [result] = await connection.execute(statement, [resourceId]);
    if (Array.isArray(result)) return !!result.length;
  }
}
const permissionService = new PermissionService();
export { permissionService };
