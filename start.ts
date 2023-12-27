import { spawn } from "child_process";

let child;

if (process.platform === "win32") {
  // Windows 系统
  /**
   * 由于 Node.js 的 spawn 函数在 Windows 系统上的行为。
   * 在 Windows 系统上，spawn 函数不能直接运行 .cmd 文件，而 ts-node 实际上是一个 .cmd 文件。
   * 通过将 ts-node 改为 ts-node.cmd 来解决ts-node直接执行失败的问题。
   * 如果换用node来执行，还需要将 node 改为 node.exe，因为 node 在 Windows 系统上也是一个 .cmd 文件。
   */
  child = spawn("ts-node.cmd", ["--esm", "-r", "esbuild-register", "src/main.ts"]);
} else {
  // 其他系统
  child = spawn("node", [
    "--loader",
    "ts-node/esm",
    "-r",
    "esbuild-register",
    "src/main.ts"
  ]);
}

child.stdout.on("data", data => {
  console.log(`${data}`);
});

child.stderr.on("data", data => {
  console.error(`${data}`);
});

child.on("close", code => {
  console.log(`child process exited with code ${code}`);
});
