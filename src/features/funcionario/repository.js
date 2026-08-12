import pool from "../../core/database/pool.js";

const FuncionarioRepository = {
  async create(data) {
    const [result] = await pool.execute(
      `INSERT INTO funcionario(nome, cpf, data_nasc, telefone, cargo) 
            VALUES(?, ?, ?, ?, ?)`,
      [data.nome, data.cpf, data.data_nasc, data.telefone, data.cargo],
    );
    return result;
  },

  async update(id, data) {
    const fields = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");

    const values = [...Object.values(data), id];

    const [result] = await pool.execute(
      `UPDATE funcionario SET ${fields} 
            WHERE id = ?`,
      values,
    );
    return result;
  },

  async delete(id) {
    const [result] = await pool.execute(
      `DELETE FROM funcionario WHERE id = ?`,
      [id],
    );
    return result;
  },

  async getById(id) {
    const [funcionario] = await pool.execute(
      `SELECT * FROM funcionario WHERE id = ?`,
      [id],
    );
    return funcionario[0];
  },

  async getAll() {
    const [funcionarios] = await pool.execute(`SELECT * FROM funcionario;`);
    return funcionarios;
  },
};

export default FuncionarioRepository;
