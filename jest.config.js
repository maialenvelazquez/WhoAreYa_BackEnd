module.exports = {
    testEnvironment: "node",
    moduleNameMapper: {
        "^app$": "<rootDir>/src/app.js",
        "^models/(.*)$": "<rootDir>/src/models/$1",
        "^routes/(.*)$": "<rootDir>/src/routes/$1",
        "^controllers/(.*)$": "<rootDir>/src/controllers/$1",
        "^middleware/(.*)$": "<rootDir>/src/middleware/$1",
        "^config/(.*)$": "<rootDir>/src/config/$1"
    }
};
