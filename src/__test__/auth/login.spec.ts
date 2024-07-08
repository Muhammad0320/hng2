import request from "supertest";
import app from "../../app";

it("returns a 400 on invalid email ", async () => {
  await request(app)
    .post("/api/auth/login")
    .send({ email: "shitmail", password: "shitpassword" })
    .expect(400);

  await request(app)
    .post("/api/auth/login")
    .send({ password: "shitpassword" })
    .expect(400);
});

it("returns a 400 on invalid password", async () => {
  await request(app)
    .post("/api/auth/login")
    .send({ email: "shitmail@gmail.com", password: "shit" })
    .expect(400);

  await request(app)
    .post("/api/auth/login")
    .send({ email: "shitmail@gmail.com" })
    .expect(400);
});