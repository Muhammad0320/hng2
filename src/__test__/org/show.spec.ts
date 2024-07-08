import request from "supertest";
import app from "../../app";

it("returns a 401 for unauthorized request", async () => {
  await request(app)
    .get(`/api/organisations/shitid`)

    .expect(401);
});
