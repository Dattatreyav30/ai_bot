const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const Data = sequelize.define("UserData", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  question: {
    type: Sequelize.TEXT,
  },
  answer: {
    type: Sequelize.TEXT,
  },
});

module.exports = Data;
