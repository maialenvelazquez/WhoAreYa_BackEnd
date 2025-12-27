require("dotenv").config();
const config = require("./src/config");
const connectDB = require("./src/config/database");
const app = require("./src/app");

connectDB();

app.listen(config.port, "0.0.0.0", () => {
    console.log(`Zerbitzaria martxan portu honetan: ${config.port}`);
});
