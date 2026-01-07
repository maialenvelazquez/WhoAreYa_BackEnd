const { validationResult } = require("express-validator");
const { playerValidator } = require("../../src/validators/playerValidator");

const runMiddleware = (req, res, middleware) =>
  new Promise((resolve) => middleware(req, res, resolve));

describe("playerValidator", () => {
  test("datu zuzenak", async () => {
    const req = {
      body: {
        id: 1,
        name: "Messi",
        birthdate: "1987-06-24",
        nationality: "Argentina",
        teamId: 10,
        leagueId: 1,
        position: "FW"
      }
    };
    const res = {};

    for (const mw of playerValidator) {
      await runMiddleware(req, res, mw);
    }

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true);
  });

  test("name falta da", async () => {
    const req = {
      body: {
        id: 1,
        birthdate: "1987-06-24",
        nationality: "Argentina",
        teamId: 10,
        leagueId: 1,
        position: "FW"
      }
    };
    const res = {};

    for (const mw of playerValidator) {
      await runMiddleware(req, res, mw);
    }

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);

    const nameError = errors.array().find(e => e.path === "name");
    expect(nameError.msg).toBe("Izenak ezin du hutsik egon");
  });
});
