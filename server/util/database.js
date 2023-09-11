const Sequelize = require("sequelize");

const sequelize = Sequelize.define("ai_bot", "root", "Mykoshi@30", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
