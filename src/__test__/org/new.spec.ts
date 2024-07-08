import app from "../../app";
import request from "supertest";

it("returns a 401 for unauth request", async () => {
  await request(app)
    .post(`/api/organisations`)
    .send()
    .expect(401);
});

it("returns a 400, for invalid request", async () => {
  await request(app)
    .get(`/api/organisations`)
    .set("Cookie", await global.signin())
    .send({ name: "Muhammad org" })
    .expect(400);
});