

import { sqlDatabase, sqlPassword, sqlServer, sqlUser } from './const';
import { authSqlDatabase, authSqlPassword, authSqlServer, authSqlUser } from './const';

// prepare
var mysql = require('mysql2/promise');

export const pool = mysql.createPool({
  host: sqlServer,
  user: sqlUser,
  password: sqlPassword,
  database: sqlDatabase,
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export const authPool = mysql.createPool({
  host: authSqlServer,
  user: authSqlUser,
  password: authSqlPassword,
  database: authSqlDatabase,
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});