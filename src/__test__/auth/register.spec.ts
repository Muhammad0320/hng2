import request from "supertest";
import app from "../../app";

it("returns a 400 for invalid inputs", async () => {
  await request(app)
    .post("/api/auth/register")
    .send({
      email: "shitmail",
      password: "shitPassword",
      passwordConfim: "shitPassword",
      firstName: "paul",
      lastName: "lisanAlgaib",
      phone: +2349166537641,
    })
    .expect(400);

  await request(app)
    .post("/api/auth/register")
    .send({
      password: "shitPassword",
      passwordConfim: "shitPassword",
      firstName: "paul",
      lastName: "lisanAlgaib",
      phone: +2349166537641,
    })
    .expect(400);

  await request(app)
    .post("/api/auth/register")
    .send({
      email: "shitmail@gmail.com",

      passwordConfim: "shitPassword",
      firstName: "paul",
      lastName: "lisanAlgaib",
      phone: +2349166537641,
    })
    .expect(400);

  await request(app)
    .post("/api/auth/register")
    .send({
      email: "shitmail@gmail.com",
      password: "shitPassword",

      firstName: "paul",
      lastName: "lisanAlgaib",
      phone: +2349166537641,
    })
    .expect(400);

  await request(app)
    .post("/api/auth/register")
    .send({
      email: "shitmail@gmail.com",
      password: "shitPassword",
      passwordConfim: "shitPassword",

      lastName: "lisanAlgaib",
      phone: +2349166537641,
    })
    .expect(400);

  await request(app)
    .post("/api/auth/register")
    .send({
      email: "shitmail@gmail.com",
      password: "shitPassword",
      passwordConfim: "shitPassword",
      firstName: "paul",
      lastName: "lisanAlgaib",
      phone: +23491665376,
    })
    .expect(400);

  await request(app)
    .post("/api/auth/register")
    .send({
      email: "shitmail@gmail.com",
      password: "shitPassword",
      passwordConfim: "shitPassword",
      firstName: "paul",
      lastName: "lisanAlgaib",
      phone: "2349166537641",
    })
    .expect(400);
});

