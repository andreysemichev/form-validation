const fs = require("fs");
const dataBase = require("./config").dataBase;

['./dataBase/migrations', './dataBase/seeds']
  .forEach(directory => {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  });

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      host : dataBase.host,
      port: dataBase.port,
      user : dataBase.user,
      password : dataBase.password,
      database : dataBase.name,
    },
    migrations: {
      directory: "./dataBase/migrations",
    },
    seeds: {
      directory: "./dataBase/seeds",
    }
  }
};

// knex migrate:make users_and_todos
// knex migrate:up

// knex seed:make 01_users
// knex seed:make 02_todos
// knex seed:run