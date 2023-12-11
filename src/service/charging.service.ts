import { connection } from "../app/database";
import { pilesType } from "../types/chargingPiles";
import { processMonitoringType } from "../types/chargingProcessMonitoring";
import { StatisticsType } from "../types/chargingStatistics";

/* interface IterablechargingType {
  [Symbol.iterator](): Iterator<pilesType>;
} */
class ChargingService {
  async create<T>(chargingItem: T, path: string) {
    const statement = `INSERT INTO ${path} SET ?;`;
    const [result] = await connection.query(statement, [chargingItem]);
    return result;
  }
  async delete(chargingId: number, path: string) {
    const statement = `DELETE FROM ${path} WHERE id = ?;`;
    const [result] = await connection.query(statement, [chargingId]);
    return result;
  }
  async update(chargingItem: pilesType, chargingId: number, path: string) {
    const statement = `UPDATE ${path} SET ? WHERE id = ?;`;
    const [result] = await connection.query(statement, [chargingItem, chargingId]);
    return result;
  }
  async getChargingInfo(goodsId: number, path: string) {
    const statement = `SELECT * FROM ${path} WHERE id = ?;`;
    const [result] = await connection.query(statement, [goodsId]);
    return result;
  }
  async getwholeChargingInfo(path: string) {
    if (path === "charging_stationtop4") {
      const statement = `SELECT
  (SELECT SUM(percentage) FROM (SELECT * FROM charging_stationtop4 ORDER BY id LIMIT 4) AS top4) AS totalPercentage,
  JSON_ARRAYAGG(JSON_OBJECT('id', t.id, 'city_name', t.city_name, 'percentage', t.percentage)) AS data
FROM charging_stationtop4 t;`;
      const [result] = await connection.query(statement);
      return result;
    } else {
      const statement = `SELECT * FROM ${path};`;
      const [result] = await connection.query(statement);
      return result;
    }
  }

  /*   async batchAdditions<T extends IterablechargingType>(chargingItem: T, path: string) {
    for (const item of chargingItem) {
      const statement = `INSERT INTO ${path} SET ?;`;
      await connection.query(statement, [item]);
    }
    return chargingItem;
  }
  async batchAddAmount(goods: pilesType[]) {
    for (const item of goods) {
      const statement = `INSERT INTO goodsstatistic SET ?;`;
      await connection.query(statement, [item]);
    }
    return goods;
  } */

  // 流程监控
  async monitorAdditions(chargingItem: processMonitoringType[]) {
    for (const item of chargingItem) {
      const { name, month, value } = item;
      const statement = `UPDATE charging_processmonitoring SET value= ? WHERE month = ? AND name = ?;`;
      await connection.execute(statement, [value, month, name]);
    }
  }

  async monitorUpdate(name: string, month: number, value: number) {
    const statement = `UPDATE charging_processmonitoring SET value= ? WHERE month = ? AND name = ?;`;
    const [result] = await connection.query(statement, [value, month, name]);
    return result;
  }

  async getMonitorInfo(name: string, month: number) {
    const statement = `SELECT * FROM charging_processmonitoring WHERE name = ? AND month = ?;`;
    const [result] = await connection.query(statement, [name, month]);
    return result;
  }
  async getwholeMonitorInfo() {
    const statement =
      "SELECT `name`, GROUP_CONCAT(value ORDER BY month) as data FROM charging_processMonitoring GROUP BY `name`;";
    const [res] = await connection.query(statement, []);
    if (Array.isArray(res)) {
      const result = res.map(item => {
        if ("data" in item && "name" in item && typeof item.data === "string") {
          const data = item.data.split(",");
          const dataArr = data.map(str => Number(str));

          return {
            name: item.name,
            data: dataArr
          };
        }
      });
      return result;
    }
  }
  /* 充电数据分析 */
  async batchStatisticsAdditions(chargingItem: StatisticsType[]) {
    for (const item of chargingItem) {
      const { name, value } = item;
      const statement = `UPDATE charging_processmonitoring SET value= ? WHERE name = ?;`;
      await connection.execute(statement, [value, name]);
    }
  }

  async statisticsUpdate(id: number, value: number) {
    const statement = `UPDATE charging_datastatistics SET value= ? WHERE id = ?;`;
    const [result] = await connection.query(statement, [value, id]);
    return result;
  }

  async getStatisticsInfo(id: number) {
    const statement = `SELECT * FROM charging_datastatistics WHERE id = ?;`;
    const [result] = await connection.query(statement, [id]);
    return result;
  }
  async getwholeStatisticsInfo() {
    const statement = `SELECT * FROM charging_datastatistics;`;
    const [result] = await connection.query(statement, []);
    return result;
  }
}

const chargingService = new ChargingService();
export default chargingService;
