const Sequelize = require("sequelize");
require("dotenv").config({ path: "../.env" });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    port: 3306,
  }
);

// console.log(process.env.DB_NAME);
// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);

module.exports = sequelize;
