import { Context } from "koa"; // 导入 Context 类型
import goodsService from "../service/goods.service";
import { goodsType } from "../types/goods";
class GoodsController {
  async create(ctx: Context) {
    const goods = ctx.request.body;
    const result = await goodsService.create(goods);

    // 3.返回结果
    ctx.body = {
      code: 0,
      message: "创建商品成功",
      data: result
    };
  }
  async batchAdditions(ctx: Context) {
    const goods = ctx.request.body;
    const result = await goodsService.batchAdditions(goods as goodsType[]);

    // 3.返回结果
    ctx.body = {
      code: 0,
      message: "批量创建商品成功",
      data: result
    };
  }
  async delete(ctx: Context) {
    const goodsId = ctx.params.goodsId;
    const result = await goodsService.delete(goodsId);
    ctx.body = {
      code: 0,
      message: "删除商品成功",
      data: result
    };
  }
  async update(ctx: Context) {
    const goodsId = ctx.params.goodsId;
    const goods = ctx.request.body as goodsType;
    const result = await goodsService.updateGoods(goods, goodsId);
    ctx.body = {
      code: 0,
      message: "更新商品成功",
      data: result
    };
  }
  async getwholeGoodsInfo(ctx: Context) {
    const result = await goodsService.getwholeGoodsInfo();
    ctx.body = {
      code: 0,
      message: "查询成功",
      data: result
    };
  }
  async getGoodsInfo(ctx: Context) {
    const goodsId = ctx.params.goodsId;
    const result = await goodsService.getGoodsInfo(goodsId);
    ctx.body = {
      code: 0,
      message: "查询成功",
      data: result
    };
  }
}
const goodsController = new GoodsController();
export { goodsController };
