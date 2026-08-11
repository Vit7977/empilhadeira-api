import FuncionarioRepository from "./repository.js";

const FuncionarioService = {
    async create(data){
        return await FuncionarioRepository.create(data);
    }
}

export default FuncionarioService;