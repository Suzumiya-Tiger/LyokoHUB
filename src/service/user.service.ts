class UserService {
  create(user: unknown) {
    console.log(user, "将user对象保存到数据库之中");
  }
}
const userService = new UserService();
export { userService };
