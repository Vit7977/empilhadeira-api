import { describe, expect, it, vi, beforeEach, afterAll } from "vitest";
import request from "supertest";
import { api } from "../../server.js";
import pool from "../../src/core/database/pool.js";
import { stopTelemetryCleanupScheduler } from "../../src/features/telemetria/scheduler.js";
import * as passUtils from "../../src/core/utils/passUtils.js";

describe("POST /api/usuario - Criar Usuário", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(() => {
    stopTelemetryCleanupScheduler();
  });

  it("deve criar um usuário com sucesso quando os dados forem válidos", async () => {
    vi.spyOn(pool, "execute")
      .mockResolvedValueOnce([[{ id: 1, nome: "João Silva" }]])
      .mockResolvedValueOnce([[]])
      .mockResolvedValueOnce([[]])
      .mockResolvedValueOnce([{ insertId: 1, affectedRows: 1 }]);

    const novoUsuario = {
      funcionario: 1,
      email: "joao.silva@empresa.com",
      senha: "senhaSegura123",
      nivel_acesso: "operador",
    };

    const response = await request(api).post("/api/usuario").send(novoUsuario);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      success: true,
      status: 201,
      message: "Usuario cadastrado!",
      data: {
        insertId: 1,
        affectedRows: 1,
      },
    });
  });

  it("deve retornar erro 404 ao tentar criar usuário para um funcionário inexistente", async () => {
    vi.spyOn(pool, "execute")
      .mockResolvedValueOnce([[]])
      .mockResolvedValueOnce([[]]);

    const usuarioFuncionarioInexistente = {
      funcionario: 999,
      email: "inexistente@empresa.com",
      senha: "senhaSegura123",
    };

    const response = await request(api)
      .post("/api/usuario")
      .send(usuarioFuncionarioInexistente);

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      success: false,
      status: 404,
      message: "Funcionario não encontrado!",
    });
  });

  it("deve retornar erro 409 se o funcionário já possui um usuário cadastrado", async () => {
    vi.spyOn(pool, "execute")
      .mockResolvedValueOnce([[{ id: 1, nome: "João Silva" }]])
      .mockResolvedValueOnce([
        [{ id: 10, funcionario: 1, email: "outro@empresa.com" }],
      ]);

    const usuarioDuplicadoFuncionario = {
      funcionario: 1,
      email: "novo.email@empresa.com",
      senha: "senhaSegura123",
    };

    const response = await request(api)
      .post("/api/usuario")
      .send(usuarioDuplicadoFuncionario);

    expect(response.status).toBe(409);
    expect(response.body).toMatchObject({
      success: false,
      status: 409,
      message: "Funcionario já possui um usuario cadastrado!",
    });
  });

  it("deve retornar erro 409 se o e-mail já estiver cadastrado", async () => {
    vi.spyOn(pool, "execute")
      .mockResolvedValueOnce([[{ id: 2, nome: "Maria Oliveira" }]])
      .mockResolvedValueOnce([[]])
      .mockResolvedValueOnce([[{ id: 5, email: "existente@empresa.com" }]]);

    const usuarioEmailDuplicado = {
      funcionario: 2,
      email: "existente@empresa.com",
      senha: "senhaSegura123",
    };

    const response = await request(api)
      .post("/api/usuario")
      .send(usuarioEmailDuplicado);

    expect(response.status).toBe(409);
    expect(response.body).toMatchObject({
      success: false,
      status: 409,
      message: "E-mail já cadastrado!",
    });
  });

  it("deve retornar erro 400 ao tentar criar usuário com e-mail inválido", async () => {
    const usuarioEmailInvalido = {
      funcionario: 1,
      email: "email-invalido",
      senha: "senhaSegura123",
    };

    const response = await request(api)
      .post("/api/usuario")
      .send(usuarioEmailInvalido);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: "Erro de validação!",
      error: {
        path: "email",
        message: "E-mail inválido",
      },
    });
  });

  it("deve retornar erro 400 ao tentar criar usuário com senha menor que 8 caracteres", async () => {
    const usuarioSenhaCurta = {
      funcionario: 1,
      email: "joao@empresa.com",
      senha: "123",
    };

    const response = await request(api)
      .post("/api/usuario")
      .send(usuarioSenhaCurta);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: "Erro de validação!",
      error: {
        path: "senha",
        message: "Senha deve ter no mínimo 8 caracteres",
      },
    });
  });
});

describe("POST /api/usuario/login - Login de Usuário", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterAll(() => {
    stopTelemetryCleanupScheduler();
  });

  it("deve realizar login com sucesso fornecendo e-mail e senha válidos", async () => {
    const mockUsuario = {
      id: 1,
      email: "joao@empresa.com",
      senha: "$argon2id$v=19$m=65536,t=3,p=4$fakehash",
      ativo: 1,
    };

    vi.spyOn(pool, "execute")
      .mockResolvedValueOnce([[mockUsuario]])
      .mockResolvedValueOnce([[mockUsuario]]);

    vi.spyOn(passUtils, "validatePass").mockResolvedValue(true);

    const credentials = {
      email: "joao@empresa.com",
      senha: "senhaSegura123",
    };

    const response = await request(api)
      .post("/api/usuario/login")
      .send(credentials);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      success: true,
      status: 200,
      message: "Login realizado com sucesso!",
      data: mockUsuario,
    });
  });

  it("deve retornar erro 401 ao tentar login com e-mail inexistente ou senha incorreta", async () => {
    vi.spyOn(pool, "execute").mockResolvedValueOnce([[]]);

    const credentials = {
      email: "inexistente@empresa.com",
      senha: "senhaErrada123",
    };

    const response = await request(api)
      .post("/api/usuario/login")
      .send(credentials);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      success: false,
      status: 401,
      message: "E-mail ou senha inválidos!",
    });
  });

  it("deve retornar erro 403 ao tentar login com usuário inativo", async () => {
    const mockUsuarioInativo = {
      id: 1,
      email: "inativo@empresa.com",
      senha: "$argon2id$v=19$m=65536,t=3,p=4$fakehash",
      ativo: 0,
    };

    vi.spyOn(pool, "execute").mockResolvedValueOnce([[mockUsuarioInativo]]);
    vi.spyOn(passUtils, "validatePass").mockResolvedValue(true);

    const credentials = {
      email: "inativo@empresa.com",
      senha: "senhaSegura123",
    };

    const response = await request(api)
      .post("/api/usuario/login")
      .send(credentials);

    expect(response.status).toBe(403);
    expect(response.body).toMatchObject({
      success: false,
      status: 403,
      message: "Usuario inativo. Contate o administrador.",
    });
  });

  it("deve retornar erro 400 ao enviar payload de login sem a senha", async () => {
    const credentials = {
      email: "joao@empresa.com",
    };

    const response = await request(api)
      .post("/api/usuario/login")
      .send(credentials);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: "Erro de validação!",
      error: {
        path: "senha",
      },
    });
  });
});
