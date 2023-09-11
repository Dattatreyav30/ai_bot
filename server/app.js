const express = require("express");

const bodyParser = require("body-parser");

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

app.listen(5000, () => {
  console.log("port running on 3000");
});
