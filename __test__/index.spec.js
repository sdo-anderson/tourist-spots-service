const chai = require("chai"),
  should = chai.should(),
  expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const app = require("../src/index");

const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

require("dotenv/config");

/**
 * @author Anderson Oliveira
 * @copyright 08/2019
 * @description Check route root with success
 */
describe("GET ROOT", () => {

  it("it should GET ROOT the success status", done => {

    chai
      .request(app)
      .get("/")
      .end((err, res) => {

        res.should.have.status(200);
        expect(JSON.parse(res.text))
          .to.have.property("status")
          .equal("Conectado ao Server");

        done();
      });

  });

});

/**
 * @author Anderson Oliveira
 * @copyright 08/2019
 * @description Check route root with success
 */
describe("GET SPOTS", () => {

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

  it("it should GET SPOTS the SUCCESS status", done => {

    let params = {
      key: process.env.API_KEY_MAPS,
      query: "tourist spots teste"
    };

    mock.onGet(process.env.URL_GOOGLE_MAPS, { params }).reply(200, { results: [{ formatted_address: "teste", name: "OK", photos: "teste", opening_hours: { open_now: true} }] });

    chai
      .request(app)
      .post("/api")
      .set("Content-Type", "application/graphql")
      .send(`{ query: getSpots(place: "teste") { name } }`)
      .end((err, res) => {

        res.should.have.status(200);
        res.body.data.query[0].should.have.property("name").equal("OK");

        done();
      });

  }).timeout(3000);
});
