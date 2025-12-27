const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/adminRoutes");
const playerRoutes = require("./routes/playerRoutes");
const teamRoutes = require("./routes/teamRoutes");

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

app.use("/api/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/teams", teamRoutes);

module.exports = app;
