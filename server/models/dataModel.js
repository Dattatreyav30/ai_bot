// const sequelize = require("../util/database");
// const Sequelize = require("sequelize");

// const Data = sequelize.define("UserData", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   question: {
//     type: Sequelize.TEXT,
//   },
//   answer: {
//     type: Sequelize.TEXT,
//   },
// });

// module.exports = Data;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userData = new Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("userData", userData);
