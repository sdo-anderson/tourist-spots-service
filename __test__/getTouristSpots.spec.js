const chai = require("chai"),
  should = chai.should(),
  expect = chai.expect;
const { getTouristSpots } = require("../src/consumers/getTouristSpots");

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

require("dotenv/config");

/**
 * @author Anderson Oliveira
 * @copyright 08/2019
 * @description Check route root with success
 */
describe("GET TOURIST SPOT", () => {

  let mock;

  before(() => {

      mock = new MockAdapter(axios, { delayResponse: 2000 });

  });

  afterEach(() => {

      mock.reset();

  });

  after(() => {

      mock.restore();

  });

  it("it should GET TOURIST SPOTS the SUCCESS status", async () => {

    let params = {
      key: process.env.API_KEY_MAPS,
      query: "tourist spots teste"
    };
 
    await mock.onGet(process.env.URL_GOOGLE_MAPS, { params }).reply(200, { status: "OK" });

    let resMock = await getTouristSpots("teste");

    resMock.should.have.status(200);
    resMock.config.params.should.have.property("key");
    resMock.config.params.should.have.property("query");
    resMock.data.should.have.property("status").equal("OK");

  }).timeout(3000);

  it("it should GET TOURIST SPOTS the ERROR status", async () => {
  
    let params = {
      key: process.env.API_KEY_MAPS,
      query: "tourist spots teste"
    };

    await mock.onGet(process.env.URL_GOOGLE_MAPS, { params }).reply(500, { error: "ERRO" });

    let resMock = await getTouristSpots("teste");

    resMock.should.have.status(500);
    resMock.config.params.should.have.property("key");
    resMock.config.params.should.have.property("query");
    resMock.data.should.have.property("error").equal("ERRO");

  }).timeout(3000);

});
