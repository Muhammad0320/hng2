import request from "supertest";
import app from "../../app";
import mongoose from "mongoose";
import { orgBuilder, userBuilder } from "../builder";

it("returns a 401 for unauthenticated user", async () => {
  await request(app)
    .post("/api/organisations/shitid/users")
    .send()

    .expect(401);
});

it("returns a 400 for invalid mongoose id", async () => {
  await request(app)
    .post("/api/organisations/shitid/users")
    .set("Cookie", await global.signin())
    .send()

    .expect(400);
});

it("returns a 404 for valid but umatched userId", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  const user = await userBuilder();

  await request(app)
    .post(`/api/organisations/${id}/users`)
    .set("Cookie", await global.signin())
    .send({ userId: user.id })

    .expect(404);
});

it("returns a 200 when e/thing is valid", async () => {
  const user = await userBuilder();

  const org = await orgBuilder(user.id);

  await request(app)
    .post(`/api/organisations/${org.id}/users`)
    .set("Cookie", await global.signin())
    .send({ userId: user.id })

    .expect(200);
});


