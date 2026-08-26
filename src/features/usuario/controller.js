import * as response from "../../core/utils/response.js";
import { asyncHandler } from "../../core/utils/asyncHandler.js";
import FuncionarioService from "../funcionario/service.js";
import UsuarioService from "./service.js";

const UsuarioController = {
  create: asyncHandler(async (req, res) => {
    const funcionario = await FuncionarioService.getById(req.body.funcionario);

    if (!funcionario) {
      return response.notFound(res, {
        message: "Funcionario não encontrado!",
      });
    }

    const emailExistente = await UsuarioService.getByEmail(req.body.email);

    if (emailExistente) {
      return response.conflict(res, {
        message: "E-mail já cadastrado!",
      });
    }

    const data = await UsuarioService.create(req.body);
    return response.created(res, {
      message: "Usuario cadastrado!",
      data,
    });
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const usuario = await UsuarioService.getById(id);

    if (!usuario) {
      return response.notFound(res, {
        message: "Usuario não encontrado!",
      });
    }

    if (req.body.funcionario) {
      const funcionario = await FuncionarioService.getById(req.body.funcionario);

      if (!funcionario) {
        return response.notFound(res, {
          message: "Funcionario não encontrado!",
        });
      }
    }

    if (req.body.email) {
      const emailExistente = await UsuarioService.getByEmail(req.body.email);

      if (emailExistente && emailExistente.id !== Number(id)) {
        return response.conflict(res, {
          message: "E-mail já cadastrado!",
        });
      }
    }

    const data = await UsuarioService.update(id, req.body);
    return response.success(res, {
      message: "Usuario atualizado!",
      data,
    });
  }),

  changeActive: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const usuario = await UsuarioService.getById(id);

    if (!usuario) {
      return response.notFound(res, {
        message: "Usuario não encontrado!",
      });
    }

    const newActive = !usuario.ativo;
    const data = await UsuarioService.changeActive(id, newActive);

    return response.success(res, {
      message: "Atividade alterada!",
      data,
    });
  }),

  delete: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const usuario = await UsuarioService.getById(id);

    if (!usuario) {
      return response.notFound(res, {
        message: "Usuario não encontrado!",
      });
    }

    const data = await UsuarioService.delete(id);
    return response.success(res, {
      message: "Usuario deletado!",
      data,
    });
  }),

  login: asyncHandler(async (req, res) => {
    const { email, senha } = req.body;
 
    const resultado = await UsuarioService.login(email, senha);
 
    if (!resultado) {
      return response.unauthorized(res, {
        message: "E-mail ou senha inválidos!",
      });
    }
 
    if (resultado.blocked) {
      return response.forbidden(res, {
        message: "Usuario inativo. Contate o administrador.",
      });
    }
 
    const usuario = await UsuarioService.getByEmail(email);

    return response.success(res, {
      message: "Login realizado com sucesso!",
      data: usuario,
    });
  }),

  getById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const usuario = await UsuarioService.getById(id);

    if (!usuario) {
      return response.notFound(res, {
        message: "Usuario não encontrado!",
      });
    }

    return response.success(res, {
      message: "Usuario consultado!",
      data: usuario,
    });
  }),

  getAll: asyncHandler(async (_, res) => {
    const usuarios = await UsuarioService.getAll();

    return response.success(res, {
      message: "Usuarios consultados!",
      data: usuarios,
    });
  }),
};

export default UsuarioController;
