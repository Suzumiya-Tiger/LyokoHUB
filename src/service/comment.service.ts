import { connection } from "../app/database";

class CommentService {
  async create(content: string, momentId: string, userId: string) {
    const statement = `INSERT INTO comment (content,moment_id,user_id) VALUES(?,?,?);`;
    const [result] = await connection.execute(statement, [content, momentId, userId]);
    return result;
  }
  async reply(content: string, momentId: string, commentId: string, userId: string) {
    const statement = `INSERT INTO comment (content,moment_id,comment_id,user_id) VALUES(?,?,?,?);`;
    const [result] = await connection.execute(statement, [
      content,
      momentId,
      commentId,
      userId
    ]);
    return result;
  }
}
const commentService = new CommentService();
export { commentService };
