import * as response from "../../core/utils/response.js";
import FuncionarioService from "./service.js";
import { asyncHandler } from "../../core/utils/asyncHandler.js";

const FuncionarioController = {
  create: asyncHandler(async (req, res) => {
    const data = await FuncionarioService.create(req.body);
    return response.created(res, {
      message: "Funcionario cadastrado!",
      data,
    });
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const funcionario = await FuncionarioService.getById(id);

    if (!funcionario) {
      return response.notFound(res, {
        message: "Funcionario não encontrado!",
      });
    }

    const data = await FuncionarioService.update(id, req.body);
    return response.success(res, {
      message: "Funcionario atualizado!",
      data,
    });
  }),

  changeActive: asyncHandler(async(req, res) => {
    const { id } = req.params;
    const funcionario = await FuncionarioService.getById(id);

    if(!funcionario){
      return response.notFound(res, {
        message: "Funcionario não encontrado!",
      });
    }

    const activeStatus = funcionario.ativo;

    const newActive = !activeStatus;

    const data = await FuncionarioService.changeActive(id, newActive);

    return response.success(res, {
      message: "Atividade alterada!",
      data
    })
  }),

  delete: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const funcionario = await FuncionarioService.getById(id);

    if (!funcionario) {
      return response.notFound(res, {
        message: "Funcionario não encontrado!",
      });
    }

    const data = await FuncionarioService.delete(id);
    return response.success(res, {
      message: "Funcionario deletado!",
      data,
    });
  }),

  getById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const funcionario = await FuncionarioService.getById(id);

    if (!funcionario) {
      return response.notFound(res, {
        message: "Funcionario não encontrado!",
      });
    }

    return response.success(res, {
      message: "Funcionario consultado!",
      data: funcionario,
    });
  }),

  getAll: asyncHandler(async (_, res) => {
    const funcionarios = await FuncionarioService.getAll();

    return response.success(res, {
      message: "Funcionarios consultados!",
      data: funcionarios,
    });
  }),
};

export default FuncionarioController;
