import request from "supertest";
import app from "../../app";
import { userBuilder } from "../builder";
import Org from "../../model/Organisation";

it("returns a 400 for invalid inputs", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      email: "shitmail",
      password: "shitPassword",
      passwordConfirm: "shitPassword",
      firstName: "paul",
      lastName: "lisanAlgaib",
      phone: 2349166537641,
    })
    .expect(400);

  await request(app)
    .post("/api/auth/register")
    .send({
      password: "shitPassword",
      passwordConfirm: "shitPassword",
      firstName: "paul",
      lastName: "lisanAlgaib",
      phone: 2349166537641,
    })
    .expect(400);

  await request(app)
    .post("/api/auth/register")
    .send({
      email: "shitmail@gmail.com",

      passwordConfirm: "shitPassword",
      firstName: "paul",
      lastName: "lisanAlgaib",
      phone: 2349166537641,
    })
    .expect(400);

  await request(app)
    .post("/api/auth/register")
    .send({
      email: "shitmail@gmail.com",
      password: "shitPassword",
      firstName: "paul",
      lastName: "lisanAlgaib",
      phone: 2349166537641,
    })
    .expect(400);

  await request(app)
    .post("/api/auth/register")
    .send({
      email: "shitmail@gmail.com",
      password: "shitPassword",
      passwordConfirm: "shitPassword",

      lastName: "lisanAlgaib",
      phone: 2349166537641,
    })
    .expect(400);

  await request(app)
    .post("/api/auth/register")
    .send({
      email: "shitmail@gmail.com",
      password: "shitPassword",
      passwordConfirm: "shitPassword",
      firstName: "paul",
      lastName: "lisanAlgaib",
      phone: 23491665376,
    })
    .expect(400);
});

it("returns a 400 if email already exists", async () => {
  const user = await userBuilder();

  await request(app)
    .post("/api/auth/register")
    .send({
      email: user.email,
      password: "shitPassword",
      passwordConfirm: "shitPassword",
      firstName: "paul",
      lastName: "lisanAlgaib",
      phone: 2349166537641,
    })
    .expect(400);
});

it("returns a 200 on valid input", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      email: "shitmail@gmail.com",
      password: "shitPassword",
      passwordConfirm: "shitPassword",
      firstName: "paul",
      lastName: "lisanAlgaib",
      phone: 2349166537641,
    })
    .expect(201);
});

it("creates an org off of the user", async () => {
  const {
    body: {
      data: { user },
    },
  } = await request(app)
    .post("/api/auth/register")
    .send({
      email: "shitmail@gmail.com",
      password: "shitPassword",
      passwordConfirm: "shitPassword",
      firstName: "paul",
      lastName: "lisanAlgaib",
      phone: 2349166537641,
    })
    .expect(201);

  const org = await Org.findOne({ users: user.id });

  expect(org).toBeDefined();
});

it("stores an acess token", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send({
      email: "shitmail@gmail.com",
      password: "shitPassword",
      passwordConfirm: "shitPassword",
      firstName: "paul",
      lastName: "lisanAlgaib",
      phone: 2349166537641,
    })
    .expect(201);

  expect(response.get("Set-Cookie")?.at(0)).toBeDefined();
});

