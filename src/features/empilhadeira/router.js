import { Router } from "express";
import { validate } from "../../core/middlewares/validate.js";
import {
  empilhadeiraSchema,
  updateEmpilhadeiraSchema,
  empilhadeiraIdSchema,
  empilhadeiraCodigoSchema,
  updateStatusSchema,
} from "./dto.js";

import EmpilhadeiraController from "./controller.js";

const router = Router();

router.get("/", EmpilhadeiraController.getAll);

router.get(
  "/codigo/:codigo",
  validate(empilhadeiraCodigoSchema, "params"),
  EmpilhadeiraController.getByCodigo,
);

router.get(
  "/:id",
  validate(empilhadeiraIdSchema, "params"),
  EmpilhadeiraController.getById,
);

router.post("/", validate(empilhadeiraSchema), EmpilhadeiraController.create);

router.put(
  "/:id",
  validate(empilhadeiraIdSchema, "params"),
  validate(updateEmpilhadeiraSchema),
  EmpilhadeiraController.update,
);

router.patch(
  "/status/:id",
  validate(empilhadeiraIdSchema, "params"),
  validate(updateStatusSchema),
  EmpilhadeiraController.updateStatus,
);

router.delete(
  "/:id",
  validate(empilhadeiraIdSchema, "params"),
  EmpilhadeiraController.delete,
);

export default router;
