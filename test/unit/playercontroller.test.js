jest.mock("../../src/models/player");
const Player = require("../../src/models/player");
const { getPlayers } = require("../../src/controllers/playerController");

describe("getPlayers", () => {
  test("jokalariak + pagination bueltatzen ditu", async () => {
    const mockPlayers = [{ name: "Messi" }, { name: "Haaland" }];

    Player.find.mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue(mockPlayers)
    });

    Player.countDocuments.mockResolvedValue(2);

    const req = { query: { page: 1, limit: 2 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getPlayers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockPlayers,
      pagination: {
        total: 2,
        page: 1,
        pages: 1
      }
    });
  });
});
