import request from "supertest";
import app from "../../app";

it("returns a 401 for unauththenticaged req", async () => {
  await request(app)
    .get(`/api/organisations`)
    .expect(401);
});
