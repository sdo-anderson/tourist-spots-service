const resolvers = require("../resolvers/resolverTouristSpots");
const { makeExecutableSchema } = require("graphql-tools");

const typeDefs = `
    type Opening_hours{
        open_now: Boolean
    }
    
    type Photos{
        html_attributions: [String]
        photo_reference: String
    }

    type Spots{
        formatted_address: String
        name: String
        opening_hours: Opening_hours
        photos: [Photos]
    }

    type Query {
        getSpots(place: String): [Spots]
    }
`;

module.exports = makeExecutableSchema({ typeDefs, resolvers });
