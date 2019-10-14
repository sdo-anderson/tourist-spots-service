const axios = require("axios");
const _ = require("lodash");
require("dotenv/config");

const urlMaps = process.env.URL_GOOGLE_MAPS;
const key = process.env.API_KEY_MAPS;

const getTouristSpots = async(place) => {

  let params = {
    key,
    query: "tourist spots " + place
  };

  let googleResponse = await axios
    .get(urlMaps, { params })
    .catch(err => {

      return err.response;

    });

    if (googleResponse.data && googleResponse.data.results) {
      console.log("response => ", googleResponse)
      return _.map(googleResponse.data.results, result => {

          return _.pick(result, [
            "formatted_address",
            "name",
            "photos",
            "opening_hours"
          ]);

      })
    }

    return googleResponse;
};

module.exports = { getTouristSpots };
