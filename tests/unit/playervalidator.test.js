const { playerValidator } = require("../../src/validators/playerValidator");
const { validationResult } = require("express-validator");

function runMiddleware(middleware, req, res) {
  return new Promise((resolve) => {
    middleware(req, res, resolve);
  });
}

describe("player validator", () => {
  test("valid player", async () => {
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
      await runMiddleware(mw, req, res);
    }

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(true);
  });

  test("no name", async () => {
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
      await runMiddleware(mw, req, res);
    }

    const errors = validationResult(req);
    expect(errors.isEmpty()).toBe(false);
    expect(errors.array()[0].msg).toBe("Izenak ezin du hutsik egon");
  });
});
