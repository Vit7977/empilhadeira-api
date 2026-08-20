import z from "zod";

export const usuarioSchema = z.object({
  funcionario: z.coerce
    .number({
      required_error: "Funcionário é obrigatório",
      invalid_type_error: "Funcionário deve ser um número",
    })
    .int("Funcionário deve ser um número inteiro")
    .positive("Funcionário deve ser maior que zero"),

  email: z.email({ message: "E-mail inválido" }),

  senha: z
    .string({ required_error: "Senha é obrigatória" })
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .max(255, "Senha deve ter no máximo 255 caracteres"),

  nivel_acesso: z
    .enum(["operador", "supervisor", "admin"])
    .default("operador"),

  ativo: z.boolean().default(true),
});

export const updateUsuarioSchema = usuarioSchema.partial();

export const usuarioIdSchema = z.object({
  id: z.coerce
    .number({
      required_error: "ID é obrigatório",
      invalid_type_error: "ID deve ser um número",
    })
    .int("ID deve ser um número inteiro")
    .positive("ID deve ser maior que zero"),
});
