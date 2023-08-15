import { connection } from "../app/database";

class MomentService {
  async create(content: string, userId: number) {
    const statement = "INSERT INTO moment(content,user_id) VALUES(?,?);";
    const result = await connection.execute(statement, [content, userId]);
    return result;
  }
  async queryList(
    offset: string | string[] = "0",
    size: string | string[] = "10",
    keyword: string | string[] | undefined
  ) {
    const keywordCondition = keyword ? "AND content LIKE ?" : "";
    const statement = `SELECT
	m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
	JSON_OBJECT("id",u.id,'name',u.name,'createTime',u.createAt,'updateTime',u.updateAt) user
FROM moment m
	LEFT JOIN user u ON u.id = m.user_id 
   WHERE 1=1 ${keywordCondition} 
	LIMIT ? OFFSET ?;`;
    const queryParams = keyword ? [`%${keyword}%`, size, offset] : [size, offset];
    const [result] = await connection.execute(statement, queryParams);
    return result;
  }

  async queryById(id: number) {
    const statement = `SELECT
	m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
	JSON_OBJECT("id",u.id,'name',u.name,'createTime',u.createAt,'updateTime',u.updateAt) user
  FROM moment m
	LEFT JOIN user u ON u.id = m.user_id 
   WHERE m.id=?;`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }
}
const momentService = new MomentService();
export { momentService };
