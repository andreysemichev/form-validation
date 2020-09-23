const mysql = require('mysql2/promise');
require('dotenv').config();

module.exports = mysql.createPool({
    host: process.env.GOODS_LIST_DB_HOST,
    user: process.env.GOODS_LIST_DB_USER,
    password: process.env.GOODS_LIST_PASSWORD,
    database: process.env.GOODS_LIST_DB_NAME,
    port: process.env.GOODS_LIST_DB_PORT,
})