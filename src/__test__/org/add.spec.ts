import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";

it("returns a 401 for unauthenticated user", async () => {
  await request(app)
    .get("/api/organisations/shitid/users")
    .expect(401);
});

it("returns a 400 for invalid mongoose id", async () => {
  await request(app)
    .get("/api/organisations/shitid/users")
    .set("Cookie", await global.signin())
    .expect(400);
});

it("returns a 404 for valid but umatched userId", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .get(`/api/organisations/${userId}/users`)
    .set("Cookie", await global.signin())
    .expect(404);
});