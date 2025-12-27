const {authorize} = require("../../src/middleware/auth");

describe("auhorize middleware", () => {
    test("autorizatutako erabiltzaileak", () => {
        const req = {user: {role:"admin"}};
        const res = {};
        const next = jest.fn();

        const middleware = authorize("admin");
        middleware(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    test("autorizatu gabeko erabiltzaileak", () => {
        const req = {user: {role:"user"}};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        const middleware = authorize("admin");
        middleware(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });
});