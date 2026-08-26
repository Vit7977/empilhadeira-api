import pool from "../../core/database/pool.js";

const COLUNAS_PUBLICAS =
  "id, funcionario, email, nivel_acesso, ativo, created_at";

const UsuarioRepository = {
  async create(data) {
    const [result] = await pool.execute(
      `INSERT INTO usuario(funcionario, email, senha, nivel_acesso, ativo)
            VALUES(?, ?, ?, ?, ?)`,
      [
        data.funcionario,
        data.email,
        data.senha,
        data.nivel_acesso,
        data.ativo,
      ],
    );
    return result;
  },

  async update(id, data) {
    const fields = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");

    const values = [...Object.values(data), id];

    const [result] = await pool.execute(
      `UPDATE usuario SET ${fields}
            WHERE id = ?`,
      values,
    );
    return result;
  },

  async changeActive(id, active) {
    const [result] = await pool.execute(
      `UPDATE usuario SET ativo = ? WHERE id = ?`,
      [active, id],
    );
    return result;
  },

  async delete(id) {
    const [result] = await pool.execute(`DELETE FROM usuario WHERE id = ?`, [
      id,
    ]);
    return result;
  },

  async login(email) {
    const [usuario] = await pool.execute(
      `SELECT id, funcionario, email, senha, nivel_acesso, ativo FROM usuario`, [email]
    )
    return usuario[0];
  },

  async getById(id) {
    const [usuario] = await pool.execute(
      `SELECT ${COLUNAS_PUBLICAS} FROM usuario WHERE id = ?`,
      [id],
    );
    return usuario[0];
  },

  async getByEmail(email) {
    const [usuario] = await pool.execute(
      `SELECT ${COLUNAS_PUBLICAS} FROM usuario WHERE email = ?`,
      [email],
    );
    return usuario[0];
  },

  async getAll() {
    const [usuarios] = await pool.execute(
      `SELECT ${COLUNAS_PUBLICAS} FROM usuario;`,
    );
    return usuarios;
  },
};

export default UsuarioRepository;
