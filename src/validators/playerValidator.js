const {check} = require('express-validator');

exports.playerValidator = [
    check("id").notEmpty().withMessage("ID derrigorrezkoa da").isNumeric().withMessage("ID zenbaki bat izan behar da"),
    check("name").notEmpty().withMessage('Izenak ezin du hutsik egon'),
    check("birthdate").notEmpty().withMessage("Jaiotze data derrigorrezkoa da"),
    check("nationality").notEmpty().withMessage("Nazionalitatea derrigorrezkoa da"),
    check("teamId").notEmpty().withMessage("Taldearen IDa derreigorrezkoa da").isNumeric().withMessage("Taldearen IDa zenbaki bat izan behar da"),
    check("leagueId").notEmpty().withMessage("Ligaren IDa derrigorrezkoa da").isNumeric().withMessage("Ligaren IDa zenbaki bat izan behar da"),
    check("position").notEmpty().withMessage("Posizioa derrigorrezkoa da").isIn(["GK", "DF", "MF", "FW"]).withMessage("Posizioa GK, DF, MF edo FW izan behar da")
];