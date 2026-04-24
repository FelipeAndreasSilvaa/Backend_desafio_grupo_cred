import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "../src/app.module";

describe("App (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("GET /", async () => {
    const res = await request(app.getHttpServer()).get("/");

    expect(res.status).toBe(200);
    expect(res.text).toBe("Hello World!");
  });

  afterAll(async () => {
    await app.close();
  });
});