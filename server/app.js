const express = require("express");

const bodyParser = require("body-parser");

const sequelize = require("./util/database");

const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const chatRoute = require("./routes/chatRoute");
app.use(cors());

app.use(chatRoute);

app.get("/test", (req, res, next) => {
  res.status(200).json({ message: "succesfull" });
});

sequelize.sync();
app.listen(5000, () => {
  console.log("port running on 5000");
});
