import request from "supertest";
import app from "../../app";

it("returns a 401 for unauthenticated user", async () => {
  await request(app)
    .get("/api/organisations/shitid/users")
    .expect(401);
});
