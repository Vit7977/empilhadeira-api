import * as response from "../../core/utils/response.js";
import { asyncHandler } from "../../core/utils/asyncHandler.js";
import EmpilhadeiraService from "../empilhadeira/service.js";
import TelemetriaService from "./service.js";

const TelemetriaController = {
  create: asyncHandler(async (req, res) => {
    const empilhadeira = await EmpilhadeiraService.getById(
      req.body.empilhadeira,
    );

    if (!empilhadeira) {
      return response.notFound(res, {
        message: "Empilhadeira não encontrada!",
      });
    }

    const data = await TelemetriaService.create(req.body);
    return response.created(res, {
      message: "Telemetria registrada!",
      data,
    });
  }),

  getById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const telemetria = await TelemetriaService.getById(id);

    if (!telemetria) {
      return response.notFound(res, {
        message: "Telemetria não encontrada!",
      });
    }

    return response.success(res, {
      message: "Telemetria consultada!",
      data: telemetria,
    });
  }),

  getAll: asyncHandler(async (req, res) => {
    const limit = req.query.limit ? Number(req.query.limit) : 100;
    const telemetrias = await TelemetriaService.getAll(limit);

    return response.success(res, {
      message: "Telemetrias consultadas!",
      data: telemetrias,
    });
  }),

  getByEmpilhadeira: asyncHandler(async (req, res) => {
    const { empilhadeiraId } = req.params;
    const empilhadeira = await EmpilhadeiraService.getById(empilhadeiraId);

    if (!empilhadeira) {
      return response.notFound(res, {
        message: "Empilhadeira não encontrada!",
      });
    }

    const limit = req.query.limit ? Number(req.query.limit) : 100;
    const telemetrias = await TelemetriaService.getByEmpilhadeira(
      empilhadeiraId,
      limit,
    );

    return response.success(res, {
      message: "Telemetrias da empilhadeira consultadas!",
      data: telemetrias,
    });
  }),

  getLatestByEmpilhadeira: asyncHandler(async (req, res) => {
    const { empilhadeiraId } = req.params;
    const empilhadeira = await EmpilhadeiraService.getById(empilhadeiraId);

    if (!empilhadeira) {
      return response.notFound(res, {
        message: "Empilhadeira não encontrada!",
      });
    }

    const telemetria =
      await TelemetriaService.getLatestByEmpilhadeira(empilhadeiraId);

    if (!telemetria) {
      return response.notFound(res, {
        message:
          "Nenhum registro de telemetria encontrado para esta empilhadeira!",
      });
    }

    return response.success(res, {
      message: "Última telemetria consultada!",
      data: telemetria,
    });
  }),

  delete: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const telemetria = await TelemetriaService.getById(id);

    if (!telemetria) {
      return response.notFound(res, {
        message: "Telemetria não encontrada!",
      });
    }

    const data = await TelemetriaService.delete(id);
    return response.success(res, {
      message: "Telemetria deletada!",
      data,
    });
  }),

  reset: asyncHandler(async (_, res) => {
    const data = await TelemetriaService.reset();
    return response.success(res, {
      message: "Dados de telemetria resetados!",
      data,
    });
  }),
};

export default TelemetriaController;

