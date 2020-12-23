const isDev = require("../config").isDev;
const config = require("../knexfile")[isDev ? "development" : "production"];

module.exports = require("knex")(config);