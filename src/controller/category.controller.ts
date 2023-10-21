import { Context } from "koa"; // 导入 Context 类型
import categoryService from "../service/category.service";
import { categoryType } from "../types/category";
class CategoryController {
  async create(ctx: Context) {
    const category = ctx.request.body;
    const result = await categoryService.create(category);
    ctx.body = {
      code: 0,
      message: "创建商品成功",
      data: result
    };
  }
  async batchAdditions(ctx: Context) {
    const category = ctx.request.body;
    const result = await categoryService.batchAdditions(category as categoryType[]);
    ctx.body = {
      code: 0,
      message: "批量创建商品成功",
      data: result
    };
  }
  async delete(ctx: Context) {
    const categoryId = ctx.params.categoryId;
    const result = await categoryService.delete(categoryId);
    ctx.body = {
      code: 0,
      message: "删除商品成功",
      data: result
    };
  }
  async update(ctx: Context) {
    const categoryId = ctx.params.categoryId;
    const category = ctx.request.body as categoryType;
    const result = await categoryService.updateCategory(category, categoryId);
    ctx.body = {
      code: 0,
      message: "更新商品成功",
      data: result
    };
  }
  async getwholeCategoryInfo(ctx: Context) {
    const result = (await categoryService.getwholeCategoryInfo()) as categoryType[];
    const resResult = { list: result, totalCount: result.length };
    ctx.body = {
      code: 0,
      message: "查询成功",
      data: resResult
    };
  }
  async getCategoryInfo(ctx: Context) {
    const categoryId = ctx.params.categoryId;
    const result = await categoryService.getCategoryInfo(categoryId);
    ctx.body = {
      code: 0,
      message: "查询成功",
      data: result
    };
  }

  /* 图表数据 */
  async getCategoryCount(ctx: Context) {
    const result = await categoryService.getCategoryCount();
    ctx.body = {
      code: 0,
      message: "查询成功",
      data: result
    };
  }
  async getCategorySaleCount(ctx: Context) {
    const result = await categoryService.getCategorySaleCount();
    ctx.body = {
      code: 0,
      message: "查询成功",
      data: result
    };
  }
  async getCategoryFavor(ctx: Context) {
    const result = await categoryService.getCategoryFavor();
    ctx.body = {
      code: 0,
      message: "查询成功",
      data: result
    };
  }
  async getAreaSale(ctx: Context) {
    const result = await categoryService.getAreaSale();
    ctx.body = {
      code: 0,
      message: "查询成功",
      data: result
    };
  }
  async getCategoryStatistic(ctx: Context) {
    const result = await categoryService.getCategoryStatistic();
    ctx.body = {
      code: 0,
      message: "查询成功",
      data: result
    };
  }
}
const categoryController = new CategoryController();
export { categoryController };
