import * as response from "../../core/utils/response.js";
import { asyncHandler } from "../../core/utils/asyncHandler.js";
import EmpilhadeiraService from "./service.js";

const EmpilhadeiraController = {
  create: asyncHandler(async (req, res) => {
    const total = await EmpilhadeiraService.count();

    if (total > 0) {
      return response.conflict(res, {
        message:
          "Já existe uma empilhadeira cadastrada! Exclua a atual para cadastrar outra.",
      });
    }

    const codigoExistente = await EmpilhadeiraService.getByCodigo(
      req.body.codigo,
    );

    if (codigoExistente) {
      return response.conflict(res, {
        message: "Código já cadastrado!",
      });
    }

    let data;
    try {
      data = await EmpilhadeiraService.create(req.body);
    } catch (err) {
      // Outra requisição cadastrou uma empilhadeira entre a contagem e o INSERT
      if (
        err.code === "ER_DUP_ENTRY" &&
        err.message.includes("uq_empilhadeira_unica")
      ) {
        return response.conflict(res, {
          message:
            "Já existe uma empilhadeira cadastrada! Exclua a atual para cadastrar outra.",
        });
      }
      throw err;
    }

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

  getByCodigo: asyncHandler(async (req, res) => {
    const { codigo } = req.params;
    const empilhadeira = await EmpilhadeiraService.getByCodigo(codigo);

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
