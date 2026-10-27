import mysql from 'mysql2';
import db from '../config/config.js';
import fs from 'node:fs';
import path from 'node:path';

const ca = fs.readFileSync(
  path.resolve("src/core/database/certs/ca.pem"),
  "utf8"
);

const pool = mysql.createPool({
    host: db.prod.host,
    port: db.prod.port,
    user: db.prod.user,
    password: db.prod.password,
    database: db.prod.database,

    ssl: {
        ca,
        rejectUnauthorized: true
    },

    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 50,
    maxIdle: 10,
    idleTimeout: 60000,
});

export default pool.promise();