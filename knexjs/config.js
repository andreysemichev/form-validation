require("dotenv").config();

module.exports = {
  dataBase: {
    host: process.env.KNEX_EXAMPLE_DB_HOST || "localhost",
    user: process.env.KNEX_EXAMPLE_DB_USER || "root",
    password: process.env.KNEX_EXAMPLE_DB_PASSWORD || "",
    name: process.env.KNEX_EXAMPLE_DB_NAME || "knex-example",
    port: process.env.KNEX_EXAMPLE_DB_PORT || 3306,
  },
  isDev: process.env.KNEX_EXAMPLE_IS_DEV || true,
};