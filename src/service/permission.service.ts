import { connection } from "../app/database";

class PermissionService {
  async checkMoment(momentId: string, userId: string) {
    const statement = "SELECT * FROM moment WHERE id= ? AND user_id=?;";
    const [result] = await connection.execute(statement, [momentId, userId]);
    if (Array.isArray(result)) return !!result.length;
  }
}
const permissionService = new PermissionService();
export { permissionService };
