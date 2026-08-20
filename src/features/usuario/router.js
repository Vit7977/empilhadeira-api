import { Router } from "express";
import { validate } from "../../core/middlewares/validate.js";
import {
  usuarioSchema,
  updateUsuarioSchema,
  usuarioIdSchema,
} from "./dto.js";

import UsuarioController from "./controller.js";

const router = Router();

router.get("/", UsuarioController.getAll);

router.get(
  "/:id",
  validate(usuarioIdSchema, "params"),
  UsuarioController.getById,
);

router.post("/", validate(usuarioSchema), UsuarioController.create);

router.put(
  "/:id",
  validate(usuarioIdSchema, "params"),
  validate(updateUsuarioSchema),
  UsuarioController.update,
);

router.patch(
  "/active/:id",
  validate(usuarioIdSchema, "params"),
  UsuarioController.changeActive,
);

router.delete(
  "/:id",
  validate(usuarioIdSchema, "params"),
  UsuarioController.delete,
);

export default router;
