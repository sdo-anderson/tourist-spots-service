const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("../schemas/schemaTouristSpots");
const router = express.Router();

router.use(
  "/api",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

router.get("/", (req, res) => {
  res.send({ status: "Conectado ao Server" });
});

module.exports = router;
