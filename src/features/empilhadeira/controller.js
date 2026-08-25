import * as response from "../../core/utils/response.js";
import { asyncHandler } from "../../core/utils/asyncHandler.js";
import EmpilhadeiraService from "./service.js";

const EmpilhadeiraController = {
  create: asyncHandler(async (req, res) => {
    const codigoExistente = await EmpilhadeiraService.getByCodigo(
      req.body.codigo,
    );

    if (codigoExistente) {
      return response.conflict(res, {
        message: "Código já cadastrado!",
      });
    }

    const data = await EmpilhadeiraService.create(req.body);
    return response.created(res, {
      message: "Empilhadeira cadastrada!",
      data,
    });
  }),

  update: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const empilhadeira = await EmpilhadeiraService.getById(id);

    if (!empilhadeira) {
      return response.notFound(res, {
        message: "Empilhadeira não encontrada!",
      });
    }

    if (req.body.codigo) {
      const codigoExistente = await EmpilhadeiraService.getByCodigo(
        req.body.codigo,
      );

      if (codigoExistente && codigoExistente.id !== Number(id)) {
        return response.conflict(res, {
          message: "Código já cadastrado!",
        });
      }
    }

    const data = await EmpilhadeiraService.update(id, req.body);
    return response.success(res, {
      message: "Empilhadeira atualizada!",
      data,
    });
  }),

  updateStatus: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const empilhadeira = await EmpilhadeiraService.getById(id);

    if (!empilhadeira) {
      return response.notFound(res, {
        message: "Empilhadeira não encontrada!",
      });
    }

    const data = await EmpilhadeiraService.updateStatus(id, req.body.status);

    return response.success(res, {
      message: "Status atualizado!",
      data,
    });
  }),

  delete: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const empilhadeira = await EmpilhadeiraService.getById(id);

    if (!empilhadeira) {
      return response.notFound(res, {
        message: "Empilhadeira não encontrada!",
      });
    }

    const data = await EmpilhadeiraService.delete(id);
    return response.success(res, {
      message: "Empilhadeira deletada!",
      data,
    });
  }),

  getById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const empilhadeira = await EmpilhadeiraService.getById(id);

    if (!empilhadeira) {
      return response.notFound(res, {
        message: "Empilhadeira não encontrada!",
      });
    }

    return response.success(res, {
      message: "Empilhadeira consultada!",
      data: empilhadeira,
    });
  }),

  getAll: asyncHandler(async (_, res) => {
    const empilhadeiras = await EmpilhadeiraService.getAll();

    return response.success(res, {
      message: "Empilhadeiras consultadas!",
      data: empilhadeiras,
    });
  }),
};

export default EmpilhadeiraController;
