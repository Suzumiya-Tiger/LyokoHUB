import App from "koa";
import fs from "fs";

async function registerRouters(app: App) {
  // 1.读取当前文件夹下的所有文件
  const files = fs.readdirSync(__dirname);
  // 2.遍历所有的文件
  for (const file of files) {
    if (!file.endsWith(".router.ts")) {
      continue;
    }
    /**
     * ES Modules 中提供了一个全局的 import 函数专门用来动态导入模块。
     * 具体的用法就是通过 import 函数去传入我们需要去导入模块的路径 import('./module.js')，
     * 这个调用因为它是一个普通函数，在任何一个地方都可以去使用，
     * 而且这个函数返回的是一个 Promise 。因为模块的加载是一个异步过程，
     * 当模块加载完成过后会自动去执行 then 当中所指定的这样一个回调函数
     * import('./module').then(function(module){console.log(module)})，
     * 模块的对象可以通过参数去拿到。
     */

    //   routerModule是一个代表了当前循环所处理的路由模块的对象
    /**
     * TypeScript 提供了模块的类型推断能力，当你使用 import 导入模块时，
     * 它会尝试根据导入的模块的内容来推断出相应的类型。
     * 如果导入的模块是一个默认导出，那么 TypeScript 通常会将其推断为默认导出的类型。
     *
     * routerModule 是通过 await import(./${file}) 这样的语句导入的。
     * 这意味着 TypeScript 会尝试解析被导入模块的类型。
     * 如果被导入的模块是一个 TypeScript 文件（.ts 后缀），
     * 并且该文件中包含了类型声明，那么 TypeScript 就可以正确地推断出模块的类型。
     */
    const routerModule = await import(`./${file}`);
    /**
     * 当你通过 const router = routerModule.default; 获取默认导出的内容时，
     * TypeScript 会自动将 router 推断为 Router 类型，
     * 因为 routerModule.default 是一个默认导出的 Koa 路由对象。
     */
    const router = routerModule.default; // 获取默认导出

    app.use(router.routes());
    app.use(router.allowedMethods());
  }
}
export default registerRouters;
