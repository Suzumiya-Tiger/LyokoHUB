import { connection } from "../app/database";

class MomentService {
  async create(content: string, userId: number) {
    const statement = "INSERT INTO moment(content,user_id) VALUES(?,?);";
    const result = await connection.execute(statement, [content, userId]);
    return result;
  }
}
const momentService = new MomentService();
export { momentService };
