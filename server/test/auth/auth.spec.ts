import { INestApplication, HttpStatus } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import * as express from "express";
import * as request from "supertest";
import "mocha";
import * as chai from "chai";
import { ApplicationModule } from "../../src/app.module";
import { UserService } from "../../src/user/user.service";
import { userAuthMockup } from "../user/mockup/user.mockup";

describe("Module Auth: ", () => {
  let server;
  let app: INestApplication;
  let userService: UserService;

  before(async () => {
    const module = await Test.createTestingModule({
      imports: [ApplicationModule],
      providers: [UserService],
    }).compile();

    server = express();
    app = module.createNestApplication(server);
    await app.startAllMicroservicesAsync();
    await app.init();

    userService = module.get<UserService>(UserService);
  });

  it("/POST auth/register", async () => {
    return await request(app.getHttpServer())
      .post("/auth/register")
      .send(userAuthMockup)
      .expect(HttpStatus.CREATED)
      .expect("Content-Type", /json/)
      .expect(async ({ body }) => {
        chai.assert.isObject(body);
        chai.assert.exists(body.data);
      })
      .then(async () => await userService.deleteUser(userAuthMockup.pseudo));
  });

  it("/POST auth/register duplicate", async () => {
    await userService.createUser(userAuthMockup);
    return await request(app.getHttpServer())
      .post("/auth/register")
      .send(userAuthMockup)
      .expect(HttpStatus.BAD_REQUEST)
      .expect("Content-Type", /json/)
      .expect(async ({ body }) => {
        chai.assert.isObject(body);
      })
      .then(async () => await userService.deleteUser(userAuthMockup.pseudo));
  });

  it("/POST auth/login", async () => {
    await userService.createUser(userAuthMockup);
    return await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: userAuthMockup.email,
        password: userAuthMockup.password,
      })
      .expect(HttpStatus.OK)
      .expect("Content-Type", /json/)
      .expect(async ({ body }) => {
        chai.assert.isObject(body);
        chai.assert.exists(body.data);
      })
      .then(async () => await userService.deleteUser(userAuthMockup.pseudo));
  });

  it("/POST auth/login invalid user", async () => {
    return await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: "invalid@invalid.com",
        password: "invalid",
      })
      .expect(HttpStatus.BAD_REQUEST)
      .expect("Content-Type", /json/)
      .expect(async ({ body }) => {
        chai.assert.isObject(body);
      });
  });

  it("/POST auth/login invalid credential", async () => {
    await userService.createUser(userAuthMockup);
    return await request(app.getHttpServer())
      .post("/auth/login")
      .send({
        email: userAuthMockup.email,
        password: "invalid",
      })
      .expect(HttpStatus.BAD_REQUEST)
      .expect("Content-Type", /json/)
      .expect(async ({ body }) => {
        chai.assert.isObject(body);
      })
      .then(async () => await userService.deleteUser(userAuthMockup.pseudo));
  });

  after(async () => {
    await app.close();
  });
});