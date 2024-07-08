import request from "supertest";
import app from "../../app";

it("returns a 400 on invalid email ", async () => {
  await request(app)
    .post("/api/auth/login")
    .send({ email: "shitmail", password: "shitpassword" })
    .expect(400);
});
