import { connection } from "../app/database";
import { categoryType } from "../types/category";

class DepartMentService {
  async create(category: categoryType) {
    const statement = `INSERT INTO category SET ?;`;
    const [result] = await connection.query(statement, [category]);
    return result;
  }
  async batchAdditions(category: categoryType[]) {
    for (const item of category) {
      const statement = `INSERT INTO category SET ?;`;
      await connection.query(statement, [item]);
    }
    console.log(category);
    return category;
  }
  async delete(categoryId: number) {
    const statement = `DELETE FROM category WHERE id = ?;`;
    const [result] = await connection.query(statement, [categoryId]);
    return result;
  }
  async getCategoryInfo(categoryId: number) {
    const statement = `SELECT * FROM category WHERE id = ?;`;
    const [result] = await connection.query(statement, [categoryId]);
    return result;
  }
  async getwholeCategoryInfo() {
    const statement = `SELECT * FROM category;`;
    const [result] = await connection.query(statement);
    return result;
  }
  async updateCategory(category: categoryType, categoryId: number) {
    const statement = `UPDATE category SET ? WHERE id = ?;`;
    const [result] = await connection.query(statement, [category, categoryId]);
    return result;
  }
  // 图表数据
  async getCategoryCount() {
    const statement = `SELECT id,name,count FROM category;`;
    const [result] = await connection.query(statement, []);
    return result;
  }
  async getCategorySaleCount() {
    const statement = `SELECT id,name,goodsCount FROM category;`;
    const [result] = await connection.query(statement, []);
    return result;
  }
  async getCategoryFavor() {
    const statement = `SELECT id,name,goodsFavor FROM category;`;
    const [result] = await connection.query(statement, []);
    return result;
  }
  async getCategoryStatistic() {
    const statement = `SELECT title,tips,subtitle,number1,number2 FROM goodsstatistic;`;
    const [result] = await connection.query(statement, []);
    return result;
  }
  async getAreaSale() {
    const statement = `SELECT address,count FROM goodsarea;`;
    const [result] = await connection.query(statement, []);
    return result;
  }
}
const categoryService = new DepartMentService();
export default categoryService;
