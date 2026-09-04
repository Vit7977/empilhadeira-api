import { describe, expect, it, vi, beforeEach, afterAll } from "vitest";
import request from "supertest";
import { api } from "../../server.js";
import pool from "../../src/core/database/pool.js";
import { stopTelemetryCleanupScheduler } from "../../src/features/telemetria/scheduler.js";

describe("POST /api/funcionario - Criar Funcionário", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(() => {
    stopTelemetryCleanupScheduler();
  });

  it("deve criar um funcionário com sucesso quando os dados forem válidos", async () => {
    vi.spyOn(pool, "execute").mockResolvedValue([
      { insertId: 1, affectedRows: 1 },
    ]);

    const novoFuncionario = {
      nome: "João Silva",
      cpf: "12345678901",
      data_nasc: "1990-05-15",
      telefone: "11987654321",
      cargo: "operador",
    };

    const response = await request(api)
      .post("/api/funcionario")
      .send(novoFuncionario);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      success: true,
      status: 201,
      message: "Funcionario cadastrado!",
      data: {
        insertId: 1,
        affectedRows: 1,
      },
    });
    expect(pool.execute).toHaveBeenCalled();
  });

  it("deve criar um funcionário com sucesso apenas com os campos obrigatórios", async () => {
    vi.spyOn(pool, "execute").mockResolvedValue([
      { insertId: 2, affectedRows: 1 },
    ]);

    const funcionarioMinimo = {
      nome: "Maria Oliveira",
      cpf: "98765432100",
      data_nasc: "1995-10-20",
    };

    const response = await request(api)
      .post("/api/funcionario")
      .send(funcionarioMinimo);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      success: true,
      status: 201,
      message: "Funcionario cadastrado!",
    });
    expect(pool.execute).toHaveBeenCalled();
  });

  it("deve retornar erro 400 ao tentar criar funcionário sem o nome", async () => {
    const funcionarioSemNome = {
      cpf: "12345678901",
      data_nasc: "1990-05-15",
    };

    const response = await request(api)
      .post("/api/funcionario")
      .send(funcionarioSemNome);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: "Erro de validação!",
      error: {
        path: "nome",
      },
    });
  });

  it("deve retornar erro 400 ao tentar criar funcionário sem o CPF", async () => {
    const funcionarioSemCpf = {
      nome: "Carlos Santos",
      data_nasc: "1990-05-15",
    };

    const response = await request(api)
      .post("/api/funcionario")
      .send(funcionarioSemCpf);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: "Erro de validação!",
      error: {
        path: "cpf",
      },
    });
  });

  it("deve retornar erro 400 ao tentar criar funcionário com CPF em formato inválido", async () => {
    const funcionarioCpfInvalido = {
      nome: "Carlos Santos",
      cpf: "12345",
      data_nasc: "1990-05-15",
    };

    const response = await request(api)
      .post("/api/funcionario")
      .send(funcionarioCpfInvalido);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: "Erro de validação!",
      error: {
        path: "cpf",
        message: "CPF deve ter 11 caracteres",
      },
    });
  });

  it("deve retornar erro 400 ao tentar criar funcionário com cargo inválido", async () => {
    const funcionarioCargoInvalido = {
      nome: "Carlos Santos",
      cpf: "12345678901",
      data_nasc: "1990-05-15",
      cargo: "diretor",
    };

    const response = await request(api)
      .post("/api/funcionario")
      .send(funcionarioCargoInvalido);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: "Erro de validação!",
      error: {
        path: "cargo",
      },
    });
  });
});

