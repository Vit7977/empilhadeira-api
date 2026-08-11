import * as response from '../../utils/response.js';
import FuncionarioService from './service.js';

const FuncionarioController = {
    async create(req, res){
        const data = await FuncionarioService.create(req.body);
        return response.created(res, {
            message: "Funcionario cadastrado!",
            data
        })
    }
}

export default FuncionarioController;