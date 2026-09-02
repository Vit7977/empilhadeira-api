import TelemetriaRepository from "./repository.js";

const TelemetriaService = {
  async create(data) {
    return await TelemetriaRepository.create(data);
  },

  async getById(id) {
    return await TelemetriaRepository.getById(id);
  },

  async getAll(limit = 100) {
    return await TelemetriaRepository.getAll(limit);
  },

  async getByEmpilhadeira(empilhadeiraId, limit = 100) {
    return await TelemetriaRepository.getByEmpilhadeira(empilhadeiraId, limit);
  },

  async getLatestByEmpilhadeira(empilhadeiraId) {
    return await TelemetriaRepository.getLatestByEmpilhadeira(empilhadeiraId);
  },

  async delete(id) {
    return await TelemetriaRepository.delete(id);
  },

  async reset() {
    return await TelemetriaRepository.reset();
  },

  async deleteOlderThan(seconds) {
    return await TelemetriaRepository.deleteOlderThan(seconds);
  },
};

export default TelemetriaService;

