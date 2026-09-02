import pool from "../../core/database/pool.js";

const TelemetriaRepository = {
  async create(data) {
    const fields = Object.keys(data).filter((key) => data[key] !== undefined);
    const placeholders = fields.map(() => "?").join(", ");
    const columns = fields.join(", ");
    const values = fields.map((key) => data[key]);

    const [result] = await pool.execute(
      `INSERT INTO telemetria(${columns}) VALUES(${placeholders})`,
      values,
    );
    return result;
  },

  async getById(id) {
    const [telemetria] = await pool.execute(
      `SELECT * FROM telemetria WHERE id = ?`,
      [id],
    );
    return telemetria[0];
  },

  async getAll(limit = 100) {
    const [telemetrias] = await pool.execute(
      `SELECT * FROM telemetria ORDER BY data_hora DESC LIMIT ?`,
      [String(limit)],
    );
    return telemetrias;
  },

  async getByEmpilhadeira(empilhadeiraId, limit = 100) {
    const [telemetrias] = await pool.execute(
      `SELECT * FROM telemetria WHERE empilhadeira = ? ORDER BY data_hora DESC LIMIT ?`,
      [empilhadeiraId, String(limit)],
    );
    return telemetrias;
  },

  async getLatestByEmpilhadeira(empilhadeiraId) {
    const [telemetria] = await pool.execute(
      `SELECT * FROM telemetria WHERE empilhadeira = ? ORDER BY data_hora DESC LIMIT 1`,
      [empilhadeiraId],
    );
    return telemetria[0];
  },

  async delete(id) {
    const [result] = await pool.execute(
      `DELETE FROM telemetria WHERE id = ?`,
      [id],
    );
    return result;
  },

  async reset() {
    const [result] = await pool.execute(`DELETE FROM telemetria`);
    return result;
  },

  async deleteOlderThan(seconds) {
    const [result] = await pool.execute(
      `DELETE FROM telemetria WHERE data_hora < (NOW() - INTERVAL ? SECOND)`,
      [seconds],
    );
    return result;
  },
};

export default TelemetriaRepository;

