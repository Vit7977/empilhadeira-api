import { describe, expect, it, vi, beforeEach, afterAll } from "vitest";
import request from "supertest";
import { api } from "../../server.js";
import pool from "../../src/core/database/pool.js";
import { stopTelemetryCleanupScheduler } from "../../src/features/telemetria/scheduler.js";

describe("POST /api/telemetria - Registrar Telemetria", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(() => {
    stopTelemetryCleanupScheduler();
  });

  it("deve registrar telemetria com sucesso quando a empilhadeira existe", async () => {
    vi.spyOn(pool, "execute")
      .mockResolvedValueOnce([[{ id: 1, codigo: "EMP-001" }]])
      .mockResolvedValueOnce([{ insertId: 1, affectedRows: 1 }]);

    const novaTelemetria = {
      empilhadeira: 1,
      posicao_x: 10,
      posicao_y: 20,
      nivel_bateria: 85,
      velocidade: 5.5,
      peso_carga: 1500,
      temperatura: 45,
      sensor_linha: "linha_A",
      obstaculo: false,
    };

    const response = await request(api)
      .post("/api/telemetria")
      .send(novaTelemetria);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      success: true,
      status: 201,
      message: "Telemetria registrada!",
      data: {
        insertId: 1,
        affectedRows: 1,
      },
    });
  });

  it("deve retornar erro 404 ao tentar registrar telemetria para empilhadeira inexistente", async () => {
    vi.spyOn(pool, "execute").mockResolvedValueOnce([[]]);

    const telemetriaEmpilhadeiraInexistente = {
      empilhadeira: 999,
      nivel_bateria: 50,
    };

    const response = await request(api)
      .post("/api/telemetria")
      .send(telemetriaEmpilhadeiraInexistente);

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      success: false,
      status: 404,
      message: "Empilhadeira não encontrada!",
    });
  });

  it("deve retornar erro 400 ao tentar registrar telemetria sem o campo empilhadeira", async () => {
    const telemetriaSemEmpilhadeira = {
      nivel_bateria: 80,
    };

    const response = await request(api)
      .post("/api/telemetria")
      .send(telemetriaSemEmpilhadeira);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: "Erro de validação!",
      error: {
        path: "empilhadeira",
      },
    });
  });

  it("deve retornar erro 400 ao tentar registrar telemetria com nível de bateria inválido (>100)", async () => {
    const telemetriaBateriaInvalida = {
      empilhadeira: 1,
      nivel_bateria: 150,
    };

    const response = await request(api)
      .post("/api/telemetria")
      .send(telemetriaBateriaInvalida);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: "Erro de validação!",
      error: {
        path: "nivel_bateria",
      },
    });
  });
});
