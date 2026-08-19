import z from "zod";

export const UserSchema = z.object({
    funcionario: z.coerce().int(),
    email: z.email(),
    senha: z.string(),
    nivel_acesso: z.enum(["operador", "supervisor", "admin"]),
    ativo: z.boolean()
})