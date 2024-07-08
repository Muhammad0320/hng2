import request from "supertest";
import app from "../../app";
import { userBuilder } from "../builder";

it("returns a 401 for unauththenticaged req", async () => {
  await request(app)
    .get(`/api/organisations`)
    .expect(401);
});

it("returns a 200 for valid request", async () => {
  await userBuilder();
});
