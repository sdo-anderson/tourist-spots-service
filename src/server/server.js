const express = require("express");
const routes = require("../routes");
const app = express();
require("dotenv/config");

// app.use("/static", express.static(path.join(__dirname + "/public")));

app.use("/", routes);

app.listen(process.env.PORT, (req, res) => {
  console.log("API rodando na porta", process.env.PORT);
});

module.exports = app;
