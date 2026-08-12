import FuncionarioRepository from "./repository.js";

const FuncionarioService = {
  async create(data) {
    return await FuncionarioRepository.create(data);
  },

  async update(id, data) {
    return await FuncionarioRepository.update(id, data);
  },

  async changeActive(id, active){
    return await FuncionarioRepository.changeActive(id, active);
  },

  async delete(id) {
    return await FuncionarioRepository.delete(id);
  },

  async getById(id) {
    return await FuncionarioRepository.getById(id);
  },
  async getAll() {
    return await FuncionarioRepository.getAll();
  },
};

export default FuncionarioService;
