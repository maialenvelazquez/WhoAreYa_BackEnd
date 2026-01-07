const request = require("supertest");
const app = require("../../src/app");
const Player = require("../../src/models/player");


jest.mock("../../src/config/database", () => jest.fn());


jest.mock("../../src/models/player");

describe("player routes", () => {

    test("GET /api/players → 200", async () => {

        const mockPlayers = [{ id: 1, name: "Messi" }];

        Player.find.mockReturnValue({
            skip: jest.fn().mockReturnThis(),
            limit: jest.fn().mockResolvedValue(mockPlayers)
        });

        Player.countDocuments.mockResolvedValue(1);

        const res = await request(app)
            .get("/api/players")
            .set("Cookie", "token=fakeToken");

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            success: true,
            data: mockPlayers,
            pagination: {
                total: 1,
                page: 1,
                pages: 1
            }
        });
    });

});
