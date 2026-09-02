import { Router } from "express";
import { validate } from "../../core/middlewares/validate.js";
import {
  telemetriaSchema,
  telemetriaIdSchema,
  empilhadeiraIdParamSchema,
} from "./dto.js";
import TelemetriaController from "./controller.js";

const router = Router();

router.get("/", TelemetriaController.getAll);

router.get(
  "/empilhadeira/:empilhadeiraId",
  validate(empilhadeiraIdParamSchema, "params"),
  TelemetriaController.getByEmpilhadeira,
);

router.get(
  "/empilhadeira/:empilhadeiraId/latest",
  validate(empilhadeiraIdParamSchema, "params"),
  TelemetriaController.getLatestByEmpilhadeira,
);

router.get(
  "/:id",
  validate(telemetriaIdSchema, "params"),
  TelemetriaController.getById,
);

router.post("/", validate(telemetriaSchema), TelemetriaController.create);

router.delete("/reset", TelemetriaController.reset);

router.delete(
  "/:id",
  validate(telemetriaIdSchema, "params"),
  TelemetriaController.delete,
);

export default router;

