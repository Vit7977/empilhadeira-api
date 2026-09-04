import { describe, expect, it, vi, beforeEach, afterAll } from "vitest";
import request from "supertest";
import { api } from "../../server.js";
import pool from "../../src/core/database/pool.js";
import { stopTelemetryCleanupScheduler } from "../../src/features/telemetria/scheduler.js";

describe("POST /api/empilhadeira - Criar Empilhadeira", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(() => {
    stopTelemetryCleanupScheduler();
  });

  it("deve criar uma empilhadeira com sucesso quando os dados forem válidos", async () => {
    vi.spyOn(pool, "execute")
      .mockResolvedValueOnce([[]])
      .mockResolvedValueOnce([{ insertId: 1, affectedRows: 1 }]);

    const novaEmpilhadeira = {
      codigo: "EMP-001",
      status: "disponivel",
    };

    const response = await request(api)
      .post("/api/empilhadeira")
      .send(novaEmpilhadeira);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      success: true,
      status: 201,
      message: "Empilhadeira cadastrada!",
      data: {
        insertId: 1,
        affectedRows: 1,
      },
    });
  });

  it("deve retornar erro 409 ao tentar criar empilhadeira com código já existente", async () => {
    vi.spyOn(pool, "execute").mockResolvedValueOnce([
      [{ id: 1, codigo: "EMP-001", status: "disponivel" }],
    ]);

    const empilhadeiraDuplicada = {
      codigo: "EMP-001",
    };

    const response = await request(api)
      .post("/api/empilhadeira")
      .send(empilhadeiraDuplicada);

    expect(response.status).toBe(409);
    expect(response.body).toMatchObject({
      success: false,
      status: 409,
      message: "Código já cadastrado!",
    });
  });

  it("deve retornar erro 400 ao tentar criar empilhadeira sem o código", async () => {
    const empilhadeiraSemCodigo = {
      status: "disponivel",
    };

    const response = await request(api)
      .post("/api/empilhadeira")
      .send(empilhadeiraSemCodigo);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: "Erro de validação!",
      error: {
        path: "codigo",
      },
    });
  });

  it("deve retornar erro 400 ao tentar criar empilhadeira com status inválido", async () => {
    const empilhadeiraStatusInvalido = {
      codigo: "EMP-002",
      status: "invalido",
    };

    const response = await request(api)
      .post("/api/empilhadeira")
      .send(empilhadeiraStatusInvalido);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: "Erro de validação!",
      error: {
        path: "status",
      },
    });
  });
});
