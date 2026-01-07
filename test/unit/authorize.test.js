const { authorize } = require("../../src/middleware/auth");

describe("authorize middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = { user: { role: "" } };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
  });

  test("admin rola", () => {
    req.user.role = "admin";

    authorize("admin")(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("user rola", () => {
    req.user.role = "user";

    authorize("admin")(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});
