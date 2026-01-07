jest.mock("jsonwebtoken");
jest.mock("../../src/models/User");

const jwt = require("jsonwebtoken");
const User = require("../../src/models/User");
const { protect } = require("../../src/middleware/auth");

describe("protect middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  test("tokenik ez", async () => {
    await protect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  test("token baliogabea", async () => {
    req.headers.authorization = "Bearer faketoken";
    jwt.verify.mockImplementation(() => { throw new Error("Invalid token"); });

    await protect(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  test("token zuzena", async () => {
    req.headers.authorization = "Bearer validtoken";

    jwt.verify.mockReturnValue({ id: "123" });
    User.findById.mockReturnValue({
      select: jest.fn().mockResolvedValue({ id: "123", name: "Test User" })
    });


    await protect(req, res, next);

    expect(req.user).toEqual({ id: "123", name: "Test User" });
    expect(next).toHaveBeenCalled();
  });
});
