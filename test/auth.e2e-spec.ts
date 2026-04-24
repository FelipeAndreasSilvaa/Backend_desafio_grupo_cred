import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/app.module";

describe("Auth (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("deve fazer login com sucesso", async () => {
    const email = `auth_${Date.now()}@email.com`;

    // cria usuário
    await request(app.getHttpServer())
      .post("/users")
      .send({
        nome: "Auth User",
        idade: 30,
        email,
        senha: "123456",
        cpf: String(Date.now()),
      });

    // login
    const res = await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email,
        senha: "123456",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("access_token");
  });

  afterAll(async () => {
    await app.close();
  });
});