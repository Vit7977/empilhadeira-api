import mysql from 'mysql2';
import db from '../config/config.js';

const pool = mysql.createPool({
    host: db.host,
    port: db.port,
    user: db.user,
    password: db.password,
    database: db.database,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 50,
    maxIdle: 10,
    idleTimeout: 60000,
});

export default pool.promise();