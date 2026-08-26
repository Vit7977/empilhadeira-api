import UsuarioRepository from "./repository.js";
import {hashPass, validatePass} from '../../core/utils/passUtils.js'

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
      payload.senha = await hashPass(payload.senha);
    }

    return await UsuarioRepository.update(id, payload);
  },

  async changeActive(id, active) {
    return await UsuarioRepository.changeActive(id, active);
  },

  async delete(id) {
    return await UsuarioRepository.delete(id);
  },

async login(email, senha) {
    const usuario = await UsuarioRepository.login(email);
 
    if (!usuario) {
      return null;
    }
 
    const senhaValida = await validatePass(usuario.senha, senha);
 
    if (!senhaValida) {
      return null;
    }

     if (!usuario.ativo) {
      return { blocked: true };
    }
 
    return usuario;
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
