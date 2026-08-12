import { Router } from "express";
import { validate } from "../../core/middlewares/validate.js";
import {
  funcionarioSchema,
  updateFuncionarioSchema,
  funcionarioIdSchema,
} from "./dto.js";

import FuncionarioController from "./controller.js";

const router = Router();

router.get("/", FuncionarioController.getAll);

router.get(
  "/:id",
  validate(funcionarioIdSchema, "params"),
  FuncionarioController.getById,
);

router.post("/", validate(funcionarioSchema), FuncionarioController.create);
router.put(
  "/:id",
  validate(funcionarioIdSchema, "params"),
  validate(updateFuncionarioSchema),
  FuncionarioController.update,
);

router.delete(
  "/:id",
  validate(funcionarioIdSchema, "params"),
  FuncionarioController.delete,
);

export default router;
