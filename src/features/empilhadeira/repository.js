import pool from "../../core/database/pool.js";

const EmpilhadeiraRepository = {
  async create(data) {
    const [result] = await pool.execute(
      `INSERT INTO empilhadeira(codigo, status)
            VALUES(?, ?)`,
      [data.codigo, data.status],
    );
    return result;
  },

  async update(id, data) {
    const fields = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");

    const values = [...Object.values(data), id];

    const [result] = await pool.execute(
      `UPDATE empilhadeira SET ${fields}
            WHERE id = ?`,
      values,
    );
    return result;
  },

  async updateStatus(id, status) {
    const [result] = await pool.execute(
      `UPDATE empilhadeira SET status = ? WHERE id = ?`,
      [status, id],
    );
    return result;
  },

  async delete(id) {
    // A telemetria referencia a empilhadeira (FK), então precisa ser apagada antes
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      await conn.execute(`DELETE FROM telemetria WHERE empilhadeira = ?`, [id]);
      const [result] = await conn.execute(
        `DELETE FROM empilhadeira WHERE id = ?`,
        [id],
      );
      await conn.commit();
      return result;
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },

  async getById(id) {
    const [empilhadeira] = await pool.execute(
      `SELECT * FROM empilhadeira WHERE id = ?`,
      [id],
    );
    return empilhadeira[0];
  },

  async getByCodigo(codigo) {
    const [empilhadeira] = await pool.execute(
      `SELECT * FROM empilhadeira WHERE codigo = ?`,
      [codigo],
    );
    return empilhadeira[0];
  },

  async getAll() {
    const [empilhadeiras] = await pool.execute(`SELECT * FROM empilhadeira;`);
    return empilhadeiras;
  },

  async count() {
    const [rows] = await pool.execute(
      `SELECT COUNT(*) AS total FROM empilhadeira`,
    );
    return rows[0].total;
  },
};

export default EmpilhadeiraRepository;
