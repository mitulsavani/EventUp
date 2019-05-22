//Config options for database

const mysql = require('mysql2/promise');

 const pool = mysql.createPool({
    host: process.env.DB_IP,
    user: 'csc667',
    password: 'password',
    database: 'eventupdb',
    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 0
  });
   module.exports = pool;