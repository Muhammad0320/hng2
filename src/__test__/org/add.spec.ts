import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";
import { userBuilder } from "../builder";

it("returns a 401 for unauthenticated user", async () => {
  await request(app)
    .get("/api/organisations/shitid/users")
    .send()

    .expect(401);
});

it("returns a 400 for invalid mongoose id", async () => {
  await request(app)
    .get("/api/organisations/shitid/users")
    .set("Cookie", await global.signin())
    .send()

    .expect(400);
});

it("returns a 404 for valid but umatched userId", async () => {
  const userId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .get(`/api/organisations/${userId}/users`)
    .set("Cookie", await global.signin())
    .send()

    .expect(404);
});

it("returns a 200 when e/thing is valid", async () => {
  const { userId } = await userBuilder();

  await request(app)
    .get(`/api/organisations/${userId}/users`)
    .set("Cookie", await global.signin())
    .send()
    .expect(200);
});


