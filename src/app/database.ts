import mysql from "mysql2";

// 1. Create a connection pool
const connectionPool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "lyokohub",
  port: 3306,
  password: "Code+183296",
  connectionLimit: 5
});

// 2.利用connectionPool.getConnection验证连接是否成功
connectionPool.getConnection((err, connection) => {
  // 判断错误信息
  if (err) {
    console.log("连接失败");
  } else {
    // 如果没有错误信息，说明连接成功
    // 获取connection,尝试和数据库建立一下连接
    connection.connect(err => {
      if (err) {
        console.log("与数据库连接失败", err);
      } else {
        console.log("与数据库连接成功");
      }
    });
    console.log("连接成功");
  }
});

// 3.获取连接池中的连接对象(promise)
const connection = connectionPool.promise();
export { connection };
