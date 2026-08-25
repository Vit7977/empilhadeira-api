import z from "zod";

export const STATUS_EMPILHADEIRA = ["disponivel", "operando", "parada"];

export const empilhadeiraSchema = z.object({
  codigo: z
    .string({ required_error: "Código é obrigatório" })
    .min(1, "Código é obrigatório")
    .max(100, "Código deve ter no máximo 100 caracteres"),

  status: z.enum(STATUS_EMPILHADEIRA).default("disponivel"),
});

export const updateEmpilhadeiraSchema = empilhadeiraSchema.partial();

export const updateStatusSchema = z.object({
  status: z.enum(STATUS_EMPILHADEIRA, {
    required_error: "Status é obrigatório",
    invalid_type_error: "Status inválido",
  }),
});

export const empilhadeiraIdSchema = z.object({
  id: z.coerce
    .number({
      required_error: "ID é obrigatório",
      invalid_type_error: "ID deve ser um número",
    })
    .int("ID deve ser um número inteiro")
    .positive("ID deve ser maior que zero"),
});
