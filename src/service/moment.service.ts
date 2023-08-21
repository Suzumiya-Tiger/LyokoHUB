import { connection } from "../app/database";

class MomentService {
  async search(id: string, userId: string) {
    const statement = `SELECT * FROM moment WHERE id=? AND user_id=?;`;
    const [result] = await connection.execute(statement, [id, userId]);
    return result;
  }
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
	JSON_OBJECT("id",u.id,'name',u.name,'createTime',u.createAt,'updateTime',u.updateAt) user,
   (SELECT COUNT(*) FROM comment WHERE comment.moment_id=m.id) commentCount,
     (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id=m.id) labelCount
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
	JSON_OBJECT("id",u.id,'name',u.name,'createTime',u.createAt,'updateTime',u.updateAt) user,
-- 	通过子查询语句将comment的查询结果独立出来，避免混淆和展开过多的重复结果
	(
	SELECT 
	JSON_ARRAYAGG(JSON_OBJECT(
	'id',c.id,'content',c.content,'comment_id',c.comment_id,
	'user',JSON_OBJECT('id',cu.id,'name',cu.name)
	))
	FROM comment c 
	LEFT JOIN user cu ON c.user_id=cu.id
	WHERE c.moment_id=m.id
	) comments,
	(
	JSON_ARRAYAGG(JSON_OBJECT('id',l.id,'name',l.name))
	) labels
FROM moment m
LEFT JOIN user u ON u.id = m.user_id
LEFT JOIN moment_label ml ON ml.moment_id=m.id
LEFT JOIN label l ON ml.label_id=l.id
WHERE m.id=?
GROUP BY m.id;`;
    const [result] = await connection.execute(statement, [id]);
    return result;
  }
  async update(content: string, id: number) {
    const statement = "UPDATE moment SET content=? WHERE id=?;";
    const [result] = await connection.execute(statement, [content, id]);
    return result;
  }
  async removeDetail(id: number) {
    const statement = "DELETE FROM moment WHERE id = ?;";
    const [result] = await connection.execute(statement, [id]);
    return result;
  }
  async hasLabel(momentId: string, labelId: string) {
    const statement = `SELECT * FROM moment_label WHERE moment_id=? AND label_id=?;`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    if (Array.isArray(result)) return !!result.length;
  }
  // 添加label和moment的id进入moment_label关系表

  async addLabel(momentId: string, labelId: string) {
    const statement = `INSERT INTO moment_label (moment_id,label_id) VALUES(?,?);`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result;
  }
}
const momentService = new MomentService();
export { momentService };
