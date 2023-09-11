const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const Data = sequelize.define("UserData", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  question: {
    type: Sequelize.STRING,
  },
  answer: {
    type: Sequelize.STRING,
  },
});

module.exports = Data;
