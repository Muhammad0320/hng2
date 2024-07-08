import request from "supertest";
import app from "../../app";

it("returns a 400 for invalid inputs", async () => {
  await request(app)
    .post("/api/auth/login")
    .send({
      email: "shitmail",
      password: "shitPassword",
      passwordConfim: "shitPassword",
      firstName: "paul",
      lastName: "lisanAlgaib",
      phone: +2349166537641,
    })
    .expect(400);
});
