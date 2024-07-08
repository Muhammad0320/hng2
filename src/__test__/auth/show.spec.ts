import request from "supertest";
import app from "../../app";

it("returns a 401 for unauthorized user ", async () => {
  await request(app)
    .get("/api/users/shitid")

    .expect(401);
});
