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
    .then(response => {

      return response

    })
    .catch(err => {

      return err.response;

    });
    console.log("googleResponse ===> ", googleResponse)
    if (googleResponse.data && googleResponse.data.results) {

      googleResponse = _.map(googleResponse.data.results, results => {

        return _.map(results, result => {

          return _.pick(result, [
            "formatted_address",
            "name",
            "photos",
            "opening_hours"
          ]);
          
        });

      })
    }
    console.log("result ===> ", googleResponse)
    return googleResponse;
};

module.exports = { getTouristSpots };
