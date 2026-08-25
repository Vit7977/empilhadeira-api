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
    const [result] = await pool.execute(
      `DELETE FROM empilhadeira WHERE id = ?`,
      [id],
    );
    return result;
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
};

export default EmpilhadeiraRepository;
