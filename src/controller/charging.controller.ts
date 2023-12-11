import { Context } from "koa"; // 导入 Context 类型
import chargingService from "../service/charging.service";
import { pilesType } from "../types/chargingPiles";
import { processMonitoringType } from "../types/chargingProcessMonitoring";
import { StatisticsType } from "../types/chargingStatistics";

function extractStringAfterThirdSlash(inputString: string) {
  const firstSlashIndex = inputString.indexOf("/");
  if (firstSlashIndex !== -1) {
    const secondSlashIndex = inputString.indexOf("/", firstSlashIndex + 1);
    if (secondSlashIndex !== -1) {
      const thirdSlashIndex = inputString.indexOf("/", secondSlashIndex + 1);
      const endIndex = thirdSlashIndex !== -1 ? thirdSlashIndex : undefined;
      const startIndex = secondSlashIndex + 1;
      return "charging_" + inputString.substring(startIndex, endIndex);
    }
  }
  return null;
}
class ChargingController {
  async create(ctx: Context) {
    const path = extractStringAfterThirdSlash(ctx.path);
    const chargingData = ctx.request.body;
    const result = await chargingService.create(chargingData, path);
    // 3.返回结果
    ctx.body = {
      code: 0,
      message: "创建成功",
      data: result
    };
  }
  async delete(ctx: Context) {
    const path = extractStringAfterThirdSlash(ctx.path);

    const chargingId = ctx.params.chargingId;
    const result = await chargingService.delete(chargingId, path);
    ctx.body = {
      code: 0,
      message: "删除成功",
      data: result
    };
  }
  async update(ctx: Context) {
    const path = extractStringAfterThirdSlash(ctx.path);

    const chargingId = ctx.params.chargingId;
    const chargingData = ctx.request.body as pilesType;
    const result = await chargingService.update(chargingData, chargingId, path);
    ctx.body = {
      code: 0,
      message: "更新成功",
      data: result
    };
  }
  async getwholeChargingInfo(ctx: Context) {
    const path = extractStringAfterThirdSlash(ctx.path);

    const result = await chargingService.getwholeChargingInfo(path);
    ctx.body = {
      code: 0,
      message: "查询成功",
      data: result
    };
  }
  async getChargingInfo(ctx: Context) {
    const path = extractStringAfterThirdSlash(ctx.path);

    const chargingId = ctx.params.chargingId;
    const result = await chargingService.getChargingInfo(chargingId, path);
    ctx.body = {
      code: 0,
      message: "查询成功",
      data: result
    };
  }
  /*   async batchAdditions(ctx: Context) {
    const path = extractStringAfterThirdSlash(ctx.path);
    const chargingItems = ctx.request.body as pilesType[];
    const result = await chargingService.batchAdditions(chargingItems, path);

    // 3.返回结果
    ctx.body = {
      code: 0,
      message: "批量创建成功",
      data: result
    };
  }

  async batchAddAmount(ctx: Context) {
    const goods = ctx.request.body;
    const result = await chargingService.batchAddAmount(goods as pilesType[]);

    // 3.返回结果
    ctx.body = {
      code: 0,
      message: "批量创建数量成功",
      data: result
    };
  } */

  /* 流程监控 */
  async monitorUpdate(ctx: Context) {
    const { month, name, value } = ctx.request.body as processMonitoringType;
    const result = await chargingService.monitorUpdate(name, month, value);
    ctx.body = {
      code: 0,
      message: "更新成功",
      data: result
    };
  }
  async getwholeMonitorInfo(ctx: Context) {
    const result = await chargingService.getwholeMonitorInfo();
    ctx.body = {
      code: 0,
      message: "查询成功",
      data: result
    };
  }
  async getMonitorInfo(ctx: Context) {
    const { month, name } = ctx.request.body as processMonitoringType;

    const result = await chargingService.getMonitorInfo(name, month);
    ctx.body = {
      code: 0,
      message: "查询成功",
      data: result
    };
  }
  async batchMonitorAdditions(ctx: Context) {
    const chargingItems = ctx.request.body as processMonitoringType[];
    const result = await chargingService.monitorAdditions(chargingItems);

    // 3.返回结果
    ctx.body = {
      code: 0,
      message: "批量创建成功",
      data: result
    };
  }
  /* 充电数据统计 */
  async statisticsUpdate(ctx: Context) {
    const { id, value } = ctx.request.body as StatisticsType;
    const result = await chargingService.statisticsUpdate(id, value);
    ctx.body = {
      code: 0,
      message: "更新成功",
      data: result
    };
  }
  async getwholeStatisticsInfo(ctx: Context) {
    const result = await chargingService.getwholeStatisticsInfo();
    ctx.body = {
      code: 0,
      message: "查询成功",
      data: result
    };
  }
  async getStatisticsInfo(ctx: Context) {
    const id = ctx.params.id;
    const result = await chargingService.getStatisticsInfo(id);
    ctx.body = {
      code: 0,
      message: "查询成功",
      data: result
    };
  }
  async batchStatisticsAdditions(ctx: Context) {
    const chargingItems = ctx.request.body as StatisticsType[];
    const result = await chargingService.batchStatisticsAdditions(chargingItems);

    // 3.返回结果
    ctx.body = {
      code: 0,
      message: "批量创建成功",
      data: result
    };
  }
}
const chargingController = new ChargingController();
export { chargingController };
