import z from "zod";

export const telemetriaSchema = z.object({
  empilhadeira: z.coerce
    .number({
      required_error: "Empilhadeira é obrigatória",
      invalid_type_error: "Empilhadeira deve ser um número",
    })
    .int("Empilhadeira deve ser um número inteiro")
    .positive("Empilhadeira deve ser maior que zero"),

  data_hora: z.coerce.date().optional(),

  posicao_x: z.coerce
    .number({ invalid_type_error: "Posição X deve ser um número" })
    .int("Posição X deve ser um número inteiro")
    .nonnegative("Posição X não pode ser negativa")
    .optional(),

  posicao_y: z.coerce
    .number({ invalid_type_error: "Posição Y deve ser um número" })
    .int("Posição Y deve ser um número inteiro")
    .nonnegative("Posição Y não pode ser negativa")
    .optional(),

  nivel_bateria: z.coerce
    .number({ invalid_type_error: "Nível de bateria deve ser um número" })
    .int("Nível de bateria deve ser um número inteiro")
    .min(0, "Nível de bateria deve ser entre 0 e 100")
    .max(100, "Nível de bateria deve ser entre 0 e 100")
    .optional(),

  velocidade: z.coerce
    .number({ invalid_type_error: "Velocidade deve ser um número" })
    .nonnegative("Velocidade não pode ser negativa")
    .optional(),

  peso_carga: z.coerce
    .number({ invalid_type_error: "Peso da carga deve ser um número" })
    .nonnegative("Peso da carga não pode ser negativo")
    .optional(),

  temperatura: z.coerce
    .number({ invalid_type_error: "Temperatura deve ser um número" })
    .optional(),

  sensor_linha: z
    .string({ invalid_type_error: "Sensor de linha deve ser um texto" })
    .max(100, "Sensor de linha deve ter no máximo 100 caracteres")
    .optional(),

  obstaculo: z.coerce.boolean().default(false),
});

export const telemetriaIdSchema = z.object({
  id: z.coerce
    .number({
      required_error: "ID é obrigatório",
      invalid_type_error: "ID deve ser um número",
    })
    .int("ID deve ser um número inteiro")
    .positive("ID deve ser maior que zero"),
});

export const empilhadeiraIdParamSchema = z.object({
  empilhadeiraId: z.coerce
    .number({
      required_error: "ID da empilhadeira é obrigatório",
      invalid_type_error: "ID da empilhadeira deve ser um número",
    })
    .int("ID da empilhadeira deve ser um número inteiro")
    .positive("ID da empilhadeira deve ser maior que zero"),
});

