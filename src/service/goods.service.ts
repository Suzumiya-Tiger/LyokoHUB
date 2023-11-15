import { connection } from "../app/database";
import { goodsType } from "../types/goods";

class DepartMentService {
  async create(goods: goodsType) {
    const statement = `INSERT INTO goods SET ?;`;
    const [result] = await connection.query(statement, [goods]);
    return result;
  }
  async batchAdditions(goods: goodsType[]) {
    for (const item of goods) {
      const statement = `INSERT INTO goods SET ?;`;
      await connection.query(statement, [item]);
    }
    return goods;
  }
  async batchAddAmount(goods: goodsType[]) {
    for (const item of goods) {
      const statement = `INSERT INTO goodsstatistic SET ?;`;
      await connection.query(statement, [item]);
    }
    return goods;
  }
  async delete(goodsId: number) {
    const statement = `DELETE FROM goods WHERE id = ?;`;
    const [result] = await connection.query(statement, [goodsId]);
    return result;
  }
  async getGoodsInfo(goodsId: number) {
    const statement = `SELECT * FROM goods WHERE id = ?;`;
    const [result] = await connection.query(statement, [goodsId]);
    return result;
  }
  async getwholeGoodsInfo() {
    const statement = `SELECT * FROM goods;`;
    const [result] = await connection.query(statement);
    return result;
  }
  async updateGoods(goods: goodsType, goodsId: number) {
    const statement = `UPDATE goods SET ? WHERE id = ?;`;
    const [result] = await connection.query(statement, [goods, goodsId]);
    return result;
  }
}
const goodsService = new DepartMentService();
export default goodsService;
