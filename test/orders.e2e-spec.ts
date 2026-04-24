import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/app.module";

describe("Orders (e2e)", () => {
  let app: INestApplication;
  let token: string;
  let userId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const email = `order_${Date.now()}@email.com`;

    // cria usuário
    const user = await request(app.getHttpServer())
      .post("/users")
      .send({
        nome: "Order User",
        idade: 28,
        email,
        senha: "123456",
        cpf: String(Date.now()),
      });

    userId = user.body.id;

    // login
    const login = await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email,
        senha: "123456",
      });

    token = login.body.access_token;
  });

  it("deve criar pedido", async () => {
    const res = await request(app.getHttpServer())
      .post("/order")
      .set("Authorization", `Bearer ${token}`)
      .send({
        descricao: "Pedido teste",
        userId,
      });

    expect(res.status).toBe(201);
  });

  it("deve listar pedidos", async () => {
    const res = await request(app.getHttpServer())
      .get("/order")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  afterAll(async () => {
    await app.close();
  });
});