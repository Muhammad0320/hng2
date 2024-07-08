import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";
import { userBuilder } from "../builder";

it("returns a 401 for unauthorized user ", async () => {
  await request(app)
    .get("/api/users/shitid")

    .expect(401);
});

it("returns a 400 for invalid mongoose id", async () => {
  await request(app)
    .get("/api/users/shitid")
    .set("Cookie", await global.signin())
    .expect(400);
});

it("returns a 404 for valid but unmatched id", async () => {
  await request(app)
    .get("/api/users/" + new mongoose.Types.ObjectId().toHexString())
    .set("Cookie", await global.signin())
    .expect(404);
});

it("returns a 200 when everything is valid", async () => {
  const user = await userBuilder();

  await request(app)
    .get("/api/users/" + user._id)
    .set("Cookie", await global.signin())
    .expect(400);
});