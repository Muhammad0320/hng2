import mongoose from "mongoose";
import request from "supertest";
import app from "../../app";
import { orgBuilder, userBuilder } from "../builder";

it("returns a 401 for unauthorized request", async () => {
  await request(app)
    .get(`/api/organisations/shitid`)
    .send()
    .expect(401);
});

it("returns a 400 for invlalid monogoose id", async () => {
  await request(app)
    .get(`/api/organisations/shitid`)
    .set("Cookie", await global.signin())
    .send()

    .expect(400);
});

it("returns a 404 for valid but umatched id", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .get(`/api/organisations/${id}`)
    .set("Cookie", await global.signin())
    .send()

    .expect(404);
});

it("returns a 400 if a user tried to access an org s/he does not have access", async () => {
  const user = await userBuilder();
  const org = await orgBuilder(user.id);

  await request(app)
    .get(`/api/organisations/${org.id}`)
    .set("Cookie", await global.signin())
    .send()

    .expect(400);
});

it("returns a 200 when wverything is valid", async () => {
  const user = await userBuilder();
  const org = await orgBuilder(user.id);

  await request(app)
    .get(`/api/organisations/${org.id}`)
    .set("Cookie", await global.signin(user.id))
    .send()

    .expect(200);
});
