const playerController = require("../../src/controllers/playerController");
const Player = require("../../src/models/player");

jest.mock("../../src/models/player");

describe("Player controller", ()=>{
    test("2OO", async()=>{
        const mockPlayers = [{id:1, name:"Messi"}];
        Player.find.mockReturnValue({
            skip: jest.fn().mockReturnThis(),
            limit: jest.fn().mockResolvedValue(mockPlayers)
        });

        Player.countDocuments.mockResolvedValue(1);

        const req ={query: {}};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await playerController.getPlayers(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
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