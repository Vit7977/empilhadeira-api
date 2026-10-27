import pool from "./pool.js";

try {
  const [rows] = await pool.query(
    "show tables"
  );

  console.log("MySQL conectado!", rows);
} catch (error) {
  console.error("Erro na conexão:", error.message);
} finally {
  await pool.end();
}