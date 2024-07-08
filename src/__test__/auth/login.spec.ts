import request from "supertest";
import app from "../../app";
import { userBuilder } from "../builder";

it("returns an error other than 404 if route exists", async () => {
  const { statusCode } = await request(app)
    .post("/api/auth/login")
    .send({ email: "shitemail", password: "shitPassword" });

  expect(statusCode).not.toEqual(404);
});

it("returns a 400 on invalid email format ", async () => {
  await request(app)
    .post("/api/auth/login")
    .send({ email: "shitmail", password: "shitpassword" })
    .expect(400);

  await request(app)
    .post("/api/auth/login")
    .send({ password: "shitpassword" })
    .expect(400);
});

it("returns a 400 on invalid password forrmat", async () => {
  await request(app)
    .post("/api/auth/login")
    .send({ email: "shitmail@gmail.com", password: "shit" })
    .expect(400);

  await request(app)
    .post("/api/auth/login")
    .send({ email: "shitmail@gmail.com" })
    .expect(400);
});

it("returns a 400 for incorrect credentials ", async () => {
  await request(app)
    .post("/api/auth/login")
    .send({ email: "shitmail@gmail.com", password: "shitpassword" })
    .expect(400);
});

it("returns a 200 when everything is valid", async () => {
  const { email } = await userBuilder();

  await request(app)
    .post("/api/auth/login")
    .send({ email, password: "shitPassword" })
    .expect(200);
});

it("stores and saves a cookie on valid auth", async () => {
  const { email } = await userBuilder();

  const response = await request(app)
    .post("/api/auth/login")
    .send({ email, password: "shitPassword" })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
