import { Context } from "koa"; // 导入 Context 类型
import type { userType } from "../types/service";
import { momentService } from "../service/moment.service";

class MomentController {
  async create(ctx: Context) {
    //   1.获取动态的内容
    const { content } = ctx.request.body as userType;
    //   2.动态由哪位用户来发布(通过token获取id/name)
    const { id } = ctx.user;
    // 3.将动态相关的数据插入到数据库
    const result = await momentService.create(content, id);
    ctx.body = {
      code: 0,
      message: "创建动态成功",
      data: result
    };
  }
  async getList(ctx: Context) {
    // 获取offset/size
    const { offset, size, keyword } = ctx.query;
    // 从数据库中查询动态列表
    const result = await momentService.queryList(offset, size, keyword);

    // 返回数据
    ctx.body = {
      code: 0,
      data: result
    };
  }
  async detail(ctx: Context) {
    // 1.获取动态的id
    // 对应get请求的params携带参数方式，直接从ctx.params中获取对应的参数即可
    const { momentId } = ctx.params;
    // 2.根据id查询动态详情
    const result = await momentService.queryById(momentId);
    // 3.返回数据
    ctx.body = {
      code: 0,
      data: Array.isArray(result) ? result[0] : result
    };
  }
}
const momentController = new MomentController();
export { momentController };
