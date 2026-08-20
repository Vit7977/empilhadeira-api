import UsuarioRepository from "./repository.js";
import {hashPass} from '../../core/utils/passUtils.js'

const UsuarioService = {
  async create(data) {
    const senhaHash = await hashPass(data.senha);

    return await UsuarioRepository.create({
      ...data,
      senha: senhaHash,
    });
  },

  async update(id, data) {
    const payload = { ...data };

    if (payload.senha) {
      payload.senha = await argon2.hash(payload.senha);
    }

    return await UsuarioRepository.update(id, payload);
  },

  async changeActive(id, active) {
    return await UsuarioRepository.changeActive(id, active);
  },

  async delete(id) {
    return await UsuarioRepository.delete(id);
  },

  async getById(id) {
    return await UsuarioRepository.getById(id);
  },

  async getByEmail(email) {
    return await UsuarioRepository.getByEmail(email);
  },

  async getAll() {
    return await UsuarioRepository.getAll();
  },
};

export default UsuarioService;
