import app from "../../app";
import request from "supertest";
import { userBuilder, orgBuilder } from "../builder";

it("returns a 401 for unauth request", async () => {
  await request(app)
    .post(`/api/organisations`)
    .send()
    .expect(401);
});

it("returns a 400, for invalid request", async () => {
  await request(app)
    .get(`/api/organisations`)
    .set("Cookie", await global.signin())
    .send({ name: "Muhammad org" })
    .expect(400);

  await request(app)
    .get(`/api/organisations`)
    .set("Cookie", await global.signin())
    .send({ description: "Muhammad org description" })
    .expect(400);
});

it("returns a 400 if org name already exists", async () => {
  const user = await userBuilder();

  const org = await orgBuilder(user.id);

  await request(app)
    .get(`/api/organisations`)
    .set("Cookie", await global.signin())
    .send({ name: org.name })
    .expect(400);
});

it("returns a 200 when everything is valid", async () => {
  await request(app)
    .get(`/api/organisations`)
    .set("Cookie", await global.signin())
    .send({ name: "Ahmad org" })
    .expect(400);
});