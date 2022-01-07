const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

const { addUser, selectUser } = require("./dbconnection");
const add = require("nodemon/lib/rules/add");

app.get("/userdetails", async (req, res) => {
  const list = await selectUser();
  res.json(list);
});

app.post("/adddetails", async (req, res) => {
  const user = req.body;
  await addUser(user);
  res.json({ message: "user added" });
});

app.listen(5050, () => {
  console.log("server started");
});
