const { getTouristSpots } = require("../consumers/getTouristSpots");

const spots = {
  Query: {
    getSpots(_, { place }) {
      return getTouristSpots(place);
    }
  }
};

module.exports = spots;
