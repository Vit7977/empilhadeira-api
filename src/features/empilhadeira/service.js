import EmpilhadeiraRepository from "./repository.js";

const EmpilhadeiraService = {
  async create(data) {
    return await EmpilhadeiraRepository.create(data);
  },

  async update(id, data) {
    return await EmpilhadeiraRepository.update(id, data);
  },

  async updateStatus(id, status) {
    return await EmpilhadeiraRepository.updateStatus(id, status);
  },

  async delete(id) {
    return await EmpilhadeiraRepository.delete(id);
  },

  async getById(id) {
    return await EmpilhadeiraRepository.getById(id);
  },

  async getByCodigo(codigo) {
    return await EmpilhadeiraRepository.getByCodigo(codigo);
  },

  async getAll() {
    return await EmpilhadeiraRepository.getAll();
  },
};

export default EmpilhadeiraService;
