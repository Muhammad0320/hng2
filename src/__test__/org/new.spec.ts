import app from "../../app";
import request from "supertest";

it("returns a 401 for unauth request", async () => {
  await request(app)
    .get(`/api/organisations/shitid`)
    .set("Cookie", await global.signin())
    .expect(401);
});
