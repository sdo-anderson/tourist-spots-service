const resolvers = require("../resolvers/resolverSpots");
const { makeExecutableSchema } = require("graphql-tools");

const typeDefs = `
    type Spots{
        id: ID
        address: String
        picture: String
    }

    type Query {
        getSpots: Spots
    }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
