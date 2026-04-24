import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/app.module";

describe("Users (e2e)", () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const email = `user_${Date.now()}@email.com`;

    // cria usuário
    await request(app.getHttpServer())
      .post("/users")
      .send({
        nome: "User Test",
        idade: 25,
        email,
        senha: "123456",
        cpf: String(Date.now()),
      });

    // login
    const login = await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email,
        senha: "123456",
      });

    token = login.body.access_token;
  });

  it("deve listar usuários (rota protegida)", async () => {
    const res = await request(app.getHttpServer())
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  afterAll(async () => {
    await app.close();
  });
});