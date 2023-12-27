import KoaRouter from "koa-router";
import { verifyAuth } from "../middleware/login.middleware";
import { chargingController } from "../controller/charging.controller";
const koaRouter = new KoaRouter({ prefix: "/charging" });
const chargingType = ["piles", "stationtop4", "dataanalysis", "exceptionmonitoring"];
for (let i = 0; i < chargingType.length; i++) {
  // 创建
  koaRouter.post(`/${chargingType[i]}`, verifyAuth, chargingController.create);
  // 删除
  koaRouter.delete(
    `/${chargingType[i]}/:chargingId`,
    verifyAuth,
    chargingController.delete
  );
  // 更新
  koaRouter.patch(
    `/${chargingType[i]}/:chargingId`,
    verifyAuth,
    chargingController.update
  );
  // 获取某条数据
  koaRouter.get(
    `/${chargingType[i]}/:chargingId`,
    verifyAuth,
    chargingController.getChargingInfo
  );
  // 获取所有的列表
  koaRouter.post(
    `/${chargingType[i]}/list`,
    verifyAuth,
    chargingController.getwholeChargingInfo
  );
  // 批量添加充电桩至对应的关联数据库
  /*   koaRouter.post(
    `/${chargingType[i]}/batchAdditions`,
    verifyAuth,
    chargingController.batchAdditions
  );
  koaRouter.post(
    `/${chargingType[i]}/batchAddAmount`,
    verifyAuth,
    chargingController.batchAddAmount
  ); */
}
/* 更新流程监控数据 */
koaRouter.post(
  "/processmonitoring/batchAdditions",
  verifyAuth,
  chargingController.batchMonitorAdditions
);
koaRouter.patch("/processmonitoring", verifyAuth, chargingController.monitorUpdate);
koaRouter.get("/processmonitoring", chargingController.getMonitorInfo);
koaRouter.post("/processmonitoring/list", chargingController.getwholeMonitorInfo);

/* 充电数据统计 */
koaRouter.post(
  "/statistics/batchAdditions",
  verifyAuth,
  chargingController.batchStatisticsAdditions
);
koaRouter.patch("/statistics", verifyAuth, chargingController.statisticsUpdate);
koaRouter.get("/statistics/:id", chargingController.getStatisticsInfo);
koaRouter.post("/statistics/list", chargingController.getwholeStatisticsInfo);

export default koaRouter;
