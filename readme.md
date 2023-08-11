# LyokoHub 

## **本项目结合 ESModule 和 TypeScript 实现一个基于 NodeJS 开发的平台**

### 本项目引用插件：

husky+commitizen

利用 husky 和 commitizen 保证项目的注释规范

@typescript-eslint/eslint-plugin@latest

利用 eslint 规范 typescript 代码

dotenv

用于实现全局环境变量的定义和引用

esbuild-register

用于在 Node 环境中运行 TypeScript 代码

@types/koa @types/koa-router @types/koa2-cors
@types/koa-bodyparser

用于在 Koa 中使用 typescript

koa-router

用于在 ESModule 中使用 Koa-router

nodemon

使用 nodemon 实时更新 Node 的同步刷新

### 具体实现：

pnpm install commitizen -D

pnpx commitizen init cz-conventional-changelog --pnpm --save-dev --save-exact

pnpm install @typescript-eslint/eslint-plugin@latest --save-dev

pnpm i -D esbuild-register

pnpm i --save-dev @types/koa @types/koa-router @types/koa2-cors
@types/koa-bodyparser

pnpm install koa-router --save

### 目录结构：

|-- LyokoHub
|-- .env
|-- .eslintrc.js
|-- .gitignore
|-- package.json
|-- pnpm-lock.yaml
|-- readme.md
|-- tsconfig.json
|-- .husky
| |-- pre-commit
| |-- \_
| |-- .gitignore
| |-- husky.sh
|-- src
|-- main.ts
|-- config
| |-- server.ts
|-- router
|-- user.router.ts

## 用户登录逻辑

#### 用户注册接口编写流程：

- 注册用户路由由router编写
- 处理/验证函数的控制器由controller编写
- 操作数据库相关逻辑由service编写

### 数据库连接操作：mqsql2

- 创建数据库的链接
- 验证数据库连接是否成功

### 注册用户校验

- 用户名或密码不得为空
- 用户名是否已经存在

### 密码加密操作

基于md5的16进制进行密码加密入库
