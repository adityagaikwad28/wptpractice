const mysql = require("mysql");
const Promise = require("bluebird");
const { add } = require("nodemon/lib/rules");
const { use } = require("express/lib/application");
Promise.promisifyAll(require("mysql/lib/Connection").prototype);

const dbinfo = {
  host: "localhost",
  user: "root",
  password: "cdac",
  database: "practiceset2",
};

async function addUser(user) {
  const connection = mysql.createConnection(dbinfo);

  await connection.connectAsync();

  let sql = `INSERT INTO user(username,password,email,mobno) values (?,?,?,?)`;

  await connection.queryAsync(sql, [
    user.username,
    user.password,
    user.email,
    user.mobno,
  ]);
  console.log("user added in database");
  await connection.endAsync();
}

const user = {
  username: "aditya",
  password: "aditya@123",
  email: "aditya@gmail.com",
  mobno: "987654321",
};

//addUser(user);

async function selectUser() {
  const connection = mysql.createConnection(dbinfo);

  await connection.connectAsync();

  let sql = `select *from user ORDER BY ID DESC`;
  const list = await connection.queryAsync(sql, []);
  await connection.endAsync();

  console.log(list);
  return list;
}
//selectUser();
module.exports = { addUser, selectUser };
