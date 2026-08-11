import z from 'zod';

export const funcionarioSchema = z.object({
    nome: z
        .string({ required_error: 'Nome é obrigatório' })
        .min(1, 'Nome é obrigatório')
        .max(50, 'Nome deve ter no máximo 50 caracteres'),

    cpf: z
        .string({ required_error: 'CPF é obrigatório' })
        .length(11, 'CPF deve ter 11 caracteres')
        .regex(/^\d+$/, 'CPF deve conter apenas números'),

    data_nasc: z
        .string({ required_error: 'Data de nascimento é obrigatória' }),

    telefone: z
        .string()
        .max(11, 'Telefone deve ter no máximo 11 caracteres')
        .optional(),

    cargo: z
        .enum(['operador', 'supervisor', 'tecnico', 'gerente'])
        .default('operador'),

    ativo: z
        .boolean()
        .default(true)
});

export const updateFuncionarioSchema = funcionarioSchema.partial();

export const funcionarioIdSchema = z.object({
    id: z
        .number({ required_error: 'ID é obrigatório' })
        .int('ID deve ser um número inteiro')
        .positive('ID deve ser maior que zero')
});