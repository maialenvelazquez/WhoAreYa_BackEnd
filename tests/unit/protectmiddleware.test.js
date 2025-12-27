const {protect} = require("../../src/middleware/auth");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/User");

jest.mock("jsonwebtoken");
jest.mock("../../src/models/User");

describe("protect middleware", () => {
    test("no token", async()=>{
        const req = {cookies: {}, headers:{}};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const next = jest.fn();

        await protect(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalled();
    });

    test("invalid token", async()=> {
        const req = {cookies: {token:"invalid"}, headers:{}};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        jwt.verify.mockImplementation(()=>{
            throw new Error("Invalid token");
        });

        await protect(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalled();
    });

    test("valid token", async() => {
        const req = {cookies: {token:"valid"}, headers: {}};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        jwt.verify.mockReturnValue({id:"123"});
        User.findById.mockReturnValue({
            select: jest.fn().mockResolvedValue({id:"123", role:"admin"})
        });

        await protect(req, res, next);

        expect(User.findById).toHaveBeenCalledWith("123");
        expect(req.user).toEqual({id:"123", role:"admin"});
        expect(next).toHaveBeenCalled();
    });
});