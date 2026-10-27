import "dotenv/config"

const dbConfig = {
    dev: {
        host: "localhost",
        user: "root",
        password: "",
        database: "empilhadeira",
        port: 3306,
        dialect: "mysql",
    },
    prod: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        dialect: "mysql",
    }

}

export default dbConfig;