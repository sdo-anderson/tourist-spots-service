const express = require("express");
const graphqlHTTP = require("express-graphql");
const spots = require("../schemas/schemaSpots");
const router = express.Router();

router.use(
  "/api",
  graphqlHTTP({
    schema: spots,
    graphiql: true
  })
);

router.get("/", (req, res) => {
  res.send({ status: "Conectado ao Server" });
});

module.exports = router;
