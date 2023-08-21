// 这里被迫使用require，因为@koa/multer不支持ESModule的导入方法
// 而koa-multer无法从ctx.request上获取file
// eslint-disable-next-line @typescript-eslint/no-var-requires
const multer = require("@koa/multer");

// 上传头像的中间件
const uploadAvatar = multer({
  dest: "uploads/avatar"
});
const handleAvatar = uploadAvatar.single("avatar");
// 上传其他的图片中间件 
// ......
export { handleAvatar };
