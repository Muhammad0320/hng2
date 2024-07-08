import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";

it("returns a 401 for unauthorized request", async () => {
  await request(app)
    .get(`/api/organisations/shitid`)

    .expect(401);
});

it("returns a 400 for invlalid monogoose id", async () => {
  await request(app)
    .get(`/api/organisations/shitid`)
    .set("Cookie", await global.signin())
    .expect(400);
});

it("returns a 404 for valid but umatched id", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .get(`/api/organisations/${id}`)
    .set("Cookie", await global.signin())

    .expect(404);
});
