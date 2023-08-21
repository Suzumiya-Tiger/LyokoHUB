import { connection } from "../app/database";

class FileService {
  async create(filename: string, mimetype: string, size: number, userId: number) {
    const statement = `INSERT INTO avatar(filename,mimetype,size,user_id) VALUES(?,?,?,?);`;
    const [result] = await connection.execute(statement, [
      filename,
      mimetype,
      size,
      userId
    ]);
    return result;
  }
}
const fileService = new FileService();
export { fileService };
