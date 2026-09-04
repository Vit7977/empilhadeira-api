import { describe, expect, it } from "vitest";
import request from "supertest";
import { api } from "../server";

describe("GET /health", () => {
  it("deve retornar o status da API", async () => {
    const response = await request(api).get("/health");

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      status: "UP",
    });
  });
});
