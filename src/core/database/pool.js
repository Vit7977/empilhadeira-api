import mysql from 'mysql2';
import db from '../config/config.js';

const pool = mysql.createPool({
    host: db.dev.host,
    port: db.dev.port,
    user: db.dev.user,
    password: db.dev.password,
    database: db.dev.database,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 50,
    maxIdle: 10,
    idleTimeout: 60000,
});

export default pool.promise();