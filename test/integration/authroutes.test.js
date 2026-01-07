jest.mock("../../src/models/User");

const request = require("supertest");
const app = require("../../src/app");   // ← IMPORTA app.js
const User = require("../../src/models/User");

describe("login", () => {
  test("kredentzial okerrak → 401", async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "fake@test.com", password: "wrong" });

    expect(res.status).toBe(401);
  });
});
