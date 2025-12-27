const request = require("supertest");


jest.mock("../../src/models/User", () => ({
    findOne: jest.fn().mockResolvedValue(null),
    countDocuments: jest.fn().mockResolvedValue(1),
}));

const app = require("../../src/app.js");

describe("auth routes", () => {
    test("logina gaizki", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "gaizki@gmail.com",
                password: "gaizki"
            });

        expect(res.status).toBe(401);
    });
});
